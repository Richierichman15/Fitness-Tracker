const client = require("./client");

const addActivityToRoutine = async({
  routineId,
  activityId,
  count,
  duration
}) => {
  const {rows} =await client.query(`
  INSERT INTO routine_activity("routineId", "activityId", count, duration)
  VALUES($1,$2,$3,$4)
  `, [routineId, activityId, count, duration])
  console.log('activity', rows);
  return {routineId,
    activityId,
    count,
    duration};
}

async function getRoutineActivityById(id) {}

async function getRoutineActivitiesByRoutine({ id }) {}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
