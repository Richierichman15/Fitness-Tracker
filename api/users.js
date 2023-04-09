/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { createUser, getUserById, getUserByUsername } = require("../db/users")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST /api/users/register
router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const _user = await getUserByUsername(req.body.username);
  
      if (_user) {
        res.send({    
          message: `User ${req.body.username} is already taken.`,    
          error: "Duplicate user",
          name: 'UserExistsError'
         
        });
      }

      if (req.body.password.length < 8){
        res.send({
            message: "Password Too Short!",
            error: "Password Length Error",
            name: "PasswordLengthError"
        })
      }
    

      const user = await createUser({
        username,
        password,
      });
  const token = req.body.password
  
      res.send({ message: "You're logged in!", "token": token, "user": user });
    } catch ({ name, message }) {
      next({ name, message })
    }   
  });
// POST /api/users/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

try {
 const getName = await getUserByUsername(username);
const passwordHash = await bcrypt.compare(password, getName.password)
 if (passwordHash === true){
    const userInfo = { id: getName.id, username: getName.username };
    const SECRET_KEY = process.env.JWT_SECRET;
    const token = jwt.sign(userInfo, SECRET_KEY)
    res.send ({ message: "you're logged in!", token: token, user: userInfo});
    }





} catch(err) {
    console.log(err);
}







});
// GET /api/users/me
router.get('/me', async (req, res, next) => {

    try {   

        console.log('test......');
        const newUser = await getUserById(req.body)
        console.log('newUser.....',newUser);
        res.send(newUser);
    } catch(err) {
        next(err);
    }
});

// GET /api/users/:username/routines
router.get('/', async (req, res) => {
    res.send('Welcome to users')
});


module.exports = router;
