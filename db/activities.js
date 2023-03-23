const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  // console.log('nameEEEEEEE', name, 'descriptionnnnnnnnnnnn',description);
  if (!name || !description){
    console.log('No name or description given');
    return;
  }
  try {
    const {rows: [activity]} = await client.query(`
    INSERT INTO activities(name, description)
    VALUES($1, $2)
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
    const {rows: activities} = await client.query(`
      SELECT * FROM activities;
    `)
    return activities;
  } catch(err){
    console.log(err);
  }
}

// async function getActivityById(id) {}
const getActivityById = async(id) => {
  try{
    console.log('IDDDDDDDD',id);
    const {rows: [getId]} = await client.query(`
    SELECT * FROM activities
    WHERE id=${id};
    `,[])
console.log('getIDDDDDDDDD',getId);
return getId;
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
async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
