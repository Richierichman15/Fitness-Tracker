
const client = require("./client");
// const { getAllRoutinesByUser } = require("./routines")
// const { getUserById } = require("./users");
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
    WHERE "routineId" =$1
  `,[id]);
  return rows;
} catch (error) {
  console.log(error);
}
}
async function updateRoutineActivity({ id, ...fields }) {
  try{
    const {rows: [update]} = await client.query(`
    UPDATE routine_activities
    SET duration=$1, count=$2
    WHERE routine_activities.id=$3
    RETURNING *;
`,[fields.duration, fields.count, id])
 return update;

  } catch(err){
    console.log(err);
  }


} 





async function destroyRoutineActivity(id) {

try {

 const { rows: [routineActivity] } = await client.query(`
 DELETE
 FROM routine_activities
 WHERE id=$1
RETURNING *;
 `, [id])

 return routineActivity;

} catch(err) {
  console.log(err);
}

}



async function canEditRoutineActivity(routineActivityId, userId) {
// console.log('routineActivityId......',routineActivityId,'userid...',userId);


try{

  const {rows: [routineFromRoutineActivities]} = await client.query(`
  SELECT *
  FROM routine_activities
  JOIN routines
  ON routine_activities."routineId"=routines.id
  AND routine_activities.id=$1;
  `,[routineActivityId])
  return routineFromRoutineActivities.creatorId === userId
//check if creatorId equals userId


} catch(err) {
  console.log(err);
}



}



module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};