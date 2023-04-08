/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { createUser, getUserById, getUserByUsername } = require("../db/users")

// POST /api/users/register
router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
console.log('req.body......',req.body);
    try {
      const _user = await getUserByUsername(username);
  
      if (_user) {
        next({        
          error: "Duplicate user",
          message: 'A user by that name already exists',
          name: 'UserExistsError'
         
        });
      }
  console.log("........useruser.....:",_user);
      const user = await createUser({
        username,
        password,
      });
  console.log('..........user....:',user);
    console.log('.....req body password', req.body.password);
  const token = req.body.password
  
      res.send({ message: "You're logged in!", "token": token, "user": user });
    } catch ({ name, message }) {
      next({ name, message })
    }
  });
// POST /api/users/login
router.post('/login', async (req, res) => {
    res.send('Login page')
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
