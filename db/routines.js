const { attachActivitiesToRoutines, getActivityById } = require("./activities");
const { getUserByUsername } = require("./users");
const client = require("./client");
const createRoutine = async({ creatorId, isPublic, name, goal }) => {
  try {
  const {rows: [routine]} = await client.query(`
    INSERT INTO routines("creatorId", "isPublic", "name", "goal")
    VALUES($1, $2, $3, $4)
    RETURNING *;
  `, [ creatorId, isPublic, name, goal])
  return routine;
  } catch(err) {
    console.log(err);
  }
}
const getRoutineById = async(id) => {
  try {
    const {rows: [routine]} = await client.query(`
    SELECT * FROM routines
    WHERE id=$1;
   `, [id])
    return routine
  } catch(err) {
    console.log(err);
  }
}
// gitonga's doing this one
const getRoutinesWithoutActivities = async() => {
 try{
  const { rows } = await client.query(`
  SELECT * FROM routines;
  `)
return rows;
 } catch(err){
  console.log(err);
 }
}
//gitonga's doing this one
async function getAllRoutines() {
try {
  const {rows: routines } = await client.query(`
  SELECT routines.*, users.username AS "creatorName"
  FROM routines
  JOIN users
  ON routines."creatorId"=users.id;
  `)
  return attachActivitiesToRoutines(routines)
} catch(err){
  console.log(err);
}
}
const getAllPublicRoutines = async() => {
  try {
  const {rows: routines} = await client.query(`
   SELECT routines.*, users.username AS "creatorName"
   FROM routines
   JOIN users
   ON routines."creatorId"=users.id
   WHERE "isPublic"=true;
  `)
  return attachActivitiesToRoutines(routines);
  } catch(err) {
    console.error(err);
  }
}
//i'm doing this one
const getAllRoutinesByUser = async({ username }) => {

try{
const user = await getUserByUsername(username);

const { rows: routines } = await client.query(`
SELECT routines.*, users.username AS "creatorName"
FROM routines
JOIN users
ON routines."creatorId"=users.id
WHERE routines."creatorId"=$1;
`,[user.id])
// console.log('routines:', routines);
return attachActivitiesToRoutines(routines);
  } catch(err) {
    console.error(err);
}
}
//Gitonga doing this one
const getPublicRoutinesByUser = async({ username }) => {

try {
  const user = await getUserByUsername(username);
  const { rows: pubRoutines } = await client.query(`
  SELECT routines.*, users.username AS "creatorName"
  FROM routines
  JOIN users
  On routines."creatorId"=users.id
  WHERE routines."creatorId"=$1 AND routines."isPublic"=$2
  
  `, [user.id, true]);
return attachActivitiesToRoutines(pubRoutines);
} catch(err){
  console.log(err);
}



}
//I'm getting this oen
const getPublicRoutinesByActivity = async({ id }) => {
try{

const { rows: pubRoutines } = await client.query(`

SELECT routines.*, activities.name AS "activityName", users.username AS "creatorName"
FROM routines
JOIN routine_activities
On routines.id = routine_activities."routineId"
JOIN activities
ON routine_activities."activityId" = activities.id
JOIN users 
ON routines."creatorId" = users.id
WHERE activities.id=$1 AND routines."isPublic"=true;
`, [id]);


return attachActivitiesToRoutines(pubRoutines);

} catch(err){
  console.log(err);
}
}
//Gitonga's doing this one
const updateRoutine = async({ id, ...fields }) => {
}
//I'm getting this one
const destroyRoutine = async(id)  => {
  console.log('........id.............',id);
try{
const {routineFalse} = await client.query(`

UPDATE routines
SET "isPublic"=false
WHERE routines."creatorId"=$1;

`[id])
console.log('..........routineFalse...',routineFalse);
const {deleteRoutine} = await client.query(`

DELETE 
FROM routine_activities
WHERE "routineId"=$1 AND routines."isPublic"=false;

`[id])
console.log('........deleteRoutine...',deleteRoutine);
return (routineFalse, deleteRoutine);

} catch(err) {
  console.log(err);
}

}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
