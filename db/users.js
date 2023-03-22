const client = require("./client");



// database functions

// user functions
const createUser = async({ username, password })=> {
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

const getUser = async({ username, password }) => {
  try {
    const { rows } = await client.query(`
    SELECT users FROM fitness-dev
    VALUES ($1, $2)
    
    `, [username, password])

  } catch (error) {
    throw error
  }
}

const getUserById = async(userId) => {

}

const getUserByUsername = async(userName) => {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
