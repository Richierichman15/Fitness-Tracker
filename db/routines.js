const client = require("./client");

const createRoutine = async({ creatorId, isPublic, name, goal }) =>{
  // try {

  //   console.log(createRoutine);
  // } catch (error) {
  //   throw error
  // }
}

const getRoutineById = (id) => {

}

const getRoutinesWithoutActivities = () => {

}

const getAllRoutines =() => {

}

const getAllPublicRoutines = () => {

}

const getAllRoutinesByUser = ({ username }) => {

}

const getPublicRoutinesByUser = ({ username }) => {

}

const getPublicRoutinesByActivity = ({ id }) => {

}

const updateRoutine = ({ id, ...fields }) => {

}

const destroyRoutine = (id)  => {

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
