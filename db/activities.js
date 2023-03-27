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
    const {rows: [getId]} = await client.query(`
    SELECT * FROM activities
    WHERE id=${id};
    `,[])
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

// async function updateActivity({ id, ...fields }) {

const updateActivity = async({ id, ...fields }) => { 
//fields.name yields nothing
console.log('nameeeeeeee:', {...fields},'fields.name', fields.name, 'fields descript:',fields.description);
console.log('The id before all is:',id,'The fields before is:',fields);
//ID is 12, FIELDS is {name: 'softball}
 try {

  if (!fields.name){
    console.log('no NAME');
    console.log('id before name',id,'no name.............',fields.name,'desc:',fields.description);
    //id is 13, name is undefined, desc is Football for life
    const {rows: [newAct2]} = await client.query(`
    UPDATE activities
    SET description=$1
    WHERE id=$2
    RETURNING *;  
  
    `,[fields.description, id ])
    console.log('id after name:',id,'descript after....',fields.description,'name after:',fields.name);
    //id is 13, desc is Football for life, name is undefined
    return newAct2
  }
if (!fields.description){
  console.log('no DESCRIPT');
  console.log('id before desc:',id,'no desc...............',fields.description,'name?',fields.name);
  //id is 12, desc is undefined, name is softball
  const {rows: [newAct]} = await client.query(`
  UPDATE activities
  SET name=$1
  WHERE id=$2
  RETURNING *;
  `,[fields.name, id])
  console.log('id after desc:',id,'name after:',fields.name,'descript after....',fields.description);
  //id is 12, name is softball, desc is undefined
  return newAct;
}
  
 } catch(err) {
  console.log(err);
 }

}
  // don't try to update the id
  // do update the name and description
  // return the updated activity


module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
