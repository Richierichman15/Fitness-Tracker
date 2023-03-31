const client = require("./client");
const addActivityToRoutine = async({
  routineId,
  activityId,
  count,
  duration
}) => {
  try {
  const {rows: [routineActivity] } =await client.query(`
  INSERT INTO routine_activities("routineId", "activityId", count, duration)
  VALUES($1,$2,$3,$4)
  ON CONFLICT ("routineId","activityId") DO NOTHING
  RETURNING *;
  `, [routineId, activityId, count, duration])
  // console.log('routine activity:', routineActivity);
  return routineActivity;
  } catch(err){
    console.log(err);
  }
}
async function getRoutineActivityById(id) {
try {
  const {rows: [routineActivity]} = await client.query(`
      SELECT *
      FROM routine_activities
      WHERE id = $1
  `, [id]);
  return routineActivity;
} catch (error) {
  console.log(error);
}
}
async function getRoutineActivitiesByRoutine({ id }) {
try {
  const {rows} = await client.query(`
    SELECT * FROM routine_activities
    WHERE "routineId" = ${id}
  `);
  return rows;
} catch (error) {
  console.log(error);
}
}
async function updateRoutineActivity({ id, ...fields }) {

}

async function destroyRoutineActivity(id) {

}

async function canEditRoutineActivity(routineActivityId, userId) {

}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};