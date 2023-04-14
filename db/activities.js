const client = require('./client');
// database functions
async function createActivity({ name, description }) {
  // return the new activity
  if (!name || !description){
    return;
  }
  try {
    const {rows: [activity]} = await client.query(`
    INSERT INTO activities(name, description)
    VALUES($1, $2)
    ON CONFLICT (name) DO NOTHING
    RETURNING *;
    ` ,[name, description]);
    return activity;
  } catch(err) {
    console.log(err);
  }
}
async function getAllActivities() {
  // select and return an array of all activities
  try{
    const { rows } = await client.query(`
      SELECT * FROM activities;
    `)
    return rows;
  } catch(err){
    console.log(err);
  }
}
// async function getActivityById(id) {}
const getActivityById = async(id) => {
  try{
    const {rows: [activity]} = await client.query(`
    SELECT * FROM activities
    WHERE id=$1;
    `, [id])
return activity;
  } catch(err) {
    console.log(err);
  }
}
// async function getActivityByName(name) {}
const getActivityByName = async(name) => {
  try {
    const {rows:[activity]} = await client.query(`
    SELECT * FROM activities
    WHERE name=$1;
    `,[name]);
    return activity;
    } catch(err){
    console.log(err);
  }
}
// used as a helper inside db/routines.js
// async function attachActivitiesToRoutines(routines) {}
async function attachActivitiesToRoutines(routines) {
  // no side effects
  const routinesToReturn = [...routines];
  const binds = routines.map((_, index) => `$${index + 1}`).join(', ');
  const routineIds = routines.map(routine => routine.id);
  if (!routineIds?.length) return [];
  try {
    // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
    const { rows: activities } = await client.query(`
      SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
      FROM activities
      JOIN routine_activities ON routine_activities."activityId" = activities.id
      WHERE routine_activities."routineId" IN (${ binds });
    `, routineIds);
    // loop over the routines
    for(const routine of routinesToReturn) {
      // filter the activities to only include those that have this routineId
      const activitiesToAdd = activities.filter(activity => activity.routineId === routine.id);
      // attach the activities to each single routine
      routine.activities = activitiesToAdd;
    }
    return routinesToReturn;
  } catch (error) {
    console.log(error);
  }
}
const updateActivity = async({ id, ...fields }) => {
 try {
  if (!fields.name){
    const {rows: [newAct2]} = await client.query(`
    UPDATE activities
    SET description=$1
    WHERE id=$2
    RETURNING *;
    `,[fields.description, id ])
    return newAct2
  }
if (!fields.description){
  const {rows: [newAct]} = await client.query(`
  UPDATE activities
  SET name=$1
  WHERE id=$2
  RETURNING *;
  `,[fields.name, id])
  return newAct;
}
 } catch(err) {
  console.log(err);
 }
}
  // don't try to update the id
  // do update the name and description
  // return the updated activity
module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};