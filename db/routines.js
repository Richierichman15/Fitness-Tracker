const client = require("./client");

const createRoutine = async({ creatorId, isPublic, name, goal }) =>{

  try {
  const {rows: [result]} = await client.query(`
    INSERT INTO routines("creatorId", "isPublic", name, goal)
    VALUES($1, $2, $3, $4)
    RETURNING *;
  `, [ creatorId, isPublic, name, goal])
  
  console.log('ROWS', [result]);
  return creatorId, isPublic, name, goal
  } catch(err) {
    console.log(err);
  }
}

const getRoutineById = async(id) => {
  try {
    const {rows: [getId]} = await client.query(`
    SELECT * FROM routines(id)
    WHERE id=${id}
   `, [getId])
    console.log('here', getId);
    return getId
  } catch(err) {
    console.log(err);
  }
}

const getRoutinesWithoutActivities = async() => {

    // const { rows } = await client.query(`
    // SELECT * routines
    // `)
 
}

const getAllRoutines = async() => {

}

const getAllPublicRoutines = async() => {
  try {
  const rows = await client.query(`
   SELECT 
  `)
  return rows
  } catch(err) {
    console.log(err);
  }
}

const getAllRoutinesByUser = async({ username }) => {

}

const getPublicRoutinesByUser = async({ username }) => {

}

const getPublicRoutinesByActivity = async({ id }) => {

}

const updateRoutine = async({ id, ...fields }) => {

}

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
