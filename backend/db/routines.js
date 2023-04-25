const { attachActivitiesToRoutines } = require("./activities");
const { getUserByUsername } = require("./users");
const client = require("./client");

const createRoutine = async ({ creatorId, isPublic, name, goal }) => {
  if (!name){ return }////added this later, MAY BREAK OTHER THINGS!!!!!!!!!
  try {
    const { rows: [routine] } = await client.query(`
    INSERT INTO routines("creatorId", "isPublic", "name", "goal")
    VALUES($1, $2, $3, $4)
    RETURNING *;
  `, [creatorId, isPublic, name, goal])
    return routine;
  } catch (err) {
    console.log(err);
  }
}
const getRoutineById = async (id) => {
  try {
    const { rows: [routine] } = await client.query(`
    SELECT * FROM routines
    WHERE id=$1;
   `, [id])
    return routine
  } catch (err) {
    console.log(err);
  }
}
const getRoutinesWithoutActivities = async () => {
  try {
    const { rows } = await client.query(`
  SELECT * FROM routines;
  `)
    return rows;
  } catch (err) {
    console.log(err);
  }
}
async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(`
  SELECT routines.*, users.username AS "creatorName"
  FROM routines
  JOIN users
  ON routines."creatorId"=users.id;
  `)
    return attachActivitiesToRoutines(routines)
  } catch (err) {
    console.log(err);
  }
}
const getAllPublicRoutines = async () => {
  try {
    const { rows: routines } = await client.query(`
   SELECT routines.*, users.username AS "creatorName"
   FROM routines
   JOIN users
   ON routines."creatorId"=users.id
   WHERE "isPublic"=true;
  `)
    return attachActivitiesToRoutines(routines);
  } catch (err) {
    console.error(err);
  }
}
const getAllRoutinesByUser = async ({ username }) => {

  try {
    const user = await getUserByUsername(username);

    const { rows: routines } = await client.query(`
SELECT routines.*, users.username AS "creatorName"
FROM routines
JOIN users
ON routines."creatorId"=users.id
WHERE routines."creatorId"=$1;
`, [user.id])
    return attachActivitiesToRoutines(routines);
  } catch (err) {
    console.error(err);
  }
}
const getPublicRoutinesByUser = async ({ username }) => {

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
  } catch (err) {
    console.log(err);
  }



}
const getPublicRoutinesByActivity = async ({ id }) => {
  try {

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

  } catch (err) {
    console.log(err);
  }
}
const updateRoutine = async ({ id, ...fields }) => {
  try {

    if (!fields.name) {
      const { rows: [newGoal] } = await client.query(`
      UPDATE routines
      SET goal=$1
      WHERE id=$2  
      RETURNING *;
    `, [fields.goal, id]);

      return newGoal;
    }

    if (!fields.goal) {
      const { rows: [newName] } = await client.query(`
    UPDATE routines
    SET name=$1
    WHERE id=$2  
    RETURNING *;
    `, [fields.name, id]);
      return newName;
    }

    if (!fields.isPublic) {
      const { rows: [notPublic] } = await client.query(`
     UPDATE routines
     SET "isPublic"=$1, name=$2, goal=$3
     WHERE id=$4
     RETURNING *;
    `, [false, fields.name, fields.goal, id]);
      return notPublic;
    }


  } catch (err) {
    console.log(err);
  }

}

const destroyRoutine = async (id) => {
  try {
    await client.query(`

      DELETE 
      FROM routine_activities
      WHERE "routineId"=$1;

  `, [id])
    await client.query(`

      DELETE
      FROM routines
      WHERE id=$1 ;

  `, [id])



  } catch (err) {
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
