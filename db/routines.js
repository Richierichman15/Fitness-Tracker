const { attachActivitiesToRoutines } = require("./activities");
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
ON routines."createId"=users.id
WHERE creatorId=$1
`,[user.id])
return attachActivitiesToRoutines(routines);
  } catch(err) {
   console.log(err);
}
}
//Gitonga doing this one
const getPublicRoutinesByUser = async({ username }) => {

}

//I'm getting this oen
const getPublicRoutinesByActivity = async({ id }) => {

}

//Gitonga's doing this one
const updateRoutine = async({ id, ...fields }) => {

}

//I'm getting this one
const destroyRoutine = async(id)  => {


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