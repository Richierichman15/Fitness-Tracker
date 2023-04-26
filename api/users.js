/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { createUser, getUserById, getUserByUsername } = require("../db/users")
const { getAllRoutinesByUser, getPublicRoutinesByUser } = require("../db/routines")
// const { requireUser } = require('./utils')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

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

    if (req.body.password.length < 8) {
      res.send({
        message: "Password Too Short!",
        error: "Password Length Error",
        name: "PasswordLengthError"
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
  const { username, password } = req.body;

  try {
    const getName = await getUserByUsername(username);
    const passwordHash = await bcrypt.compare(password, getName.password)

    if (passwordHash === true) {
      const userInfo = { id: getName.id, username: getName.username };
      const token = jwt.sign(userInfo, SECRET_KEY)
      res.send({ message: "you're logged in!", token: token, user: userInfo });
    }

  } catch (err) {
    console.log(err);
  }

});

// GET /api/users/me
router.get('/me', async (req, res, next) => {

  try {
    if (!req.user) {
      res.status(401).send({
        error: "I am error",
        message: "You must be logged in to perform this action",
        name: "Unauthorized"
      });
    }

    if (req.user) {
      const info = await getUserById(req.user.id);
      res.send(info);

    }

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
