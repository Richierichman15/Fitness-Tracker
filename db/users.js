const client = require("./client");



// database functions

// user functions
async function createUser({ username, password }) {
  try{
    
console.log('USERNAMEEEEEEEEEE',username,'PASSWORDDDDDDDDD',password);
const {rows: [users]} = await client.query(`
    INSERT INTO users(username, password)
    VALUES($1,$2)
    RETURNING *;
`,[username, password])
console.log('USERSSSSSSSSSSSS', users); 
return users;
  } catch(err) {
    console.log(err);
  }
}

async function getUser({ username, password }) {
// try {
//   const { rows: [user]} = await clienty.query(`
  
//   `)
// }
}

async function getUserById(userId) {

}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
