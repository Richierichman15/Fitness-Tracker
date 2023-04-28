const client = require("./client");
const bcrypt = require('bcrypt');
const SALT_COUNT = 10



// database functions

// user functions
const createUser = async({ username, password })=> {
  const passwordHash = await bcrypt.hash(password, SALT_COUNT)
  try{
    
const {rows: [user]} = await client.query(`
    INSERT INTO users(username, password)
    VALUES($1, $2)
    RETURNING id, username;
`,[username, passwordHash])
return user
  } catch(err) {
    console.log(err);
  }
}

const getUser = async({ username, password }) => {
  if (!username || !password) {
    return
  }
  try {
   const user = await getUserByUsername(username)
   if (!user) {
    return
   }
   const passwordHash = user.password
   const matchPassword = await bcrypt.compare(password, passwordHash)
   if (!matchPassword) {
    return 
   } 
   delete user.password
   return user
  } catch (error) {
    console.log(error);
  }
}

const getUserById = async(userId) => {
  try {
    const { rows: [user] } = await client.query(`
    SELECT * FROM users
    WHERE id=$1
    `, [userId])
    delete user.password
    return user
  } catch (error) {
    console.log(error);
  }
}

const getUserByUsername = async(userName) => {
  try {
    const { rows: [user] } = await client.query(`
    SELECT * FROM users
    WHERE username=$1;
    `, [userName])
    return user
  } catch (error) {
    console.log(error);  }
}
module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
