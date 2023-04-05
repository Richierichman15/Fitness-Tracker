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
const getPublicRoutinesByUser = async({ username }) => {
  try {
    const {rows} = await client.query(`
    SELECT * FROM "isPublic", activities, username
    RETURNING []
    `, [username])
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
}

const getPublicRoutinesByActivity = async({ id }) => {
  try{
    const { rows: pubRoutines } = await client.query(`
    SELECT routines.*, activities.name AS "activityName"
    FROM routines
    JOIN routine_activities
    On routines.id = routine_activities."routineId"
    JOIN activities
    ON routine_activities."activityId" = activities.id
    WHERE activities.id=$1 AND routines."isPublic"=true;
    `, [id]);
    return attachActivitiesToRoutines(pubRoutines);
    } catch(err){
      console.log(err);
    }
    }


    `
    UPDATE routines
    SET 
    "isPublic" = $1,
    name = $2,
    goal = $3
    WHERE id=$4
    RETURNING *;
    `
const updateRoutine = async({ id, isPublic, name, goal}) => {
  let updateQuery = `
  UPDATE routines
  SET
  ` 
  if(name) {
    const nameStr = ` name = "${name}",`
    updateQuery = updateQuery + nameStr 

  }

  if(isPublic !== undefined) {
    const publicStr = ` "isPublic" = ${isPublic},`
    updateQuery = updateQuery + publicStr
  }

  if(goal) {
    const goalStr = ` goal = "${goal}"`
    updateQuery = updateQuery + goalStr
  }
  updateQuery = updateQuery + ` WHERE id=${id} RETURNING *;`
  console.log(updateQuery);
try {
  const {rows: [updated]} = await client.query(updateQuery)
  console.log(updated);
  return updated;
} catch (error) {
  console.log(error);
}
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