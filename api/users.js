/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { createUser, getUserByUsername } = require("../db/users")
const { getAllRoutinesByUser, getPublicRoutinesByUser } = require("../db/routines")
const requireUser = require('./utils')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

// POST /api/users/register
router.post('/register', async (req, res, next) => {
  const { username, password } = req.body.user;
  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      return res.send({
        message: `User ${username} is already taken.`,
        error: "Duplicate user",
        name: 'UserExistsError'

      });
    }
    if (password.length < 8) {
      return res.send({
        message: "Password Too Short!",
        error: "Password Length Error",
        name: "PasswordLengthError"
      })
    }

    if (!username) {
      return res.send({
        message: "Please provide username!",
        error: "No username detected",
        name: "noUserName"
      })
    }

    if (!_user) {
      const user = await createUser({
        username,
        password,
      });

      const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, { expiresIn: '1w' });
      res.send({ message: "You're logged in!", "token": token, "user": user });
    }
  } catch ({ name, message }) {
    next({ name, message })
  }

});

// POST /api/users/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body.user;

  try {
    const user = await getUserByUsername(username);
    console.log('PASS..............', user);
    if (user) {
      const passwordHash = await bcrypt.compare(password, user.password)

      if (!passwordHash) { res.send({ 
        message: "Incorrect password",
        error: "IncorrectPassword"
       }) }
      if (passwordHash) {
        const userInfo = { id: user.id, username: user };
        const token = jwt.sign(userInfo, SECRET_KEY)
        res.send({ message: "you're logged in!", token: token, user: userInfo });
      }
    } else {
      res.send({ 
        message: "Password or Username incorrect",
        error: "I am Error"
      })
    }

    
  } catch (err) {
    console.log(err);
  }

});

// GET /api/users/me
router.get('/me', requireUser, async (req, res, next) => {

  try {
    res.send("Current User:", req.user)
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:username/routines
router.get('/:username/routines', async (req, res) => {
  try {
    if (req.user.username === req.params.username) {
      const getUser = await getUserByUsername(req.params.username)
      const getRoutines = await getAllRoutinesByUser(getUser)
      res.send(getRoutines)

    } else {
      const getUser = await getUserByUsername(req.params.username)
      const getRoutines = await getPublicRoutinesByUser(getUser)
      res.send(getRoutines)

    }

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
