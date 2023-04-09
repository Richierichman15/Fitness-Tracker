/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const {createUser, getUser, getUserById, getUserByUsername } = require('../db/users.js')

// POST /api/users/register
router.post('/users/register', async(req, res, next) => {
    res.send('/Register Now!')
   
    try {
        const { userName } = req.body.username;
        const { password } = req.body.password
        const creatingUser = await createUser(userName, password)
        console.log('here', req.body);
        res.send(creatingUser)
    } catch (error) {
        next(error)
    }
})

// POST /api/users/login
router.post('/users/login', async (req, res, next) => {
    res.send('login')
    try {
        const login = await getUser(req.body)
        res.send(login)
    } catch (error) {
        next(error)
    }
})

// GET /api/users/me
router.get('/users/me', async(req, res, next) => {
    res.send('Profile')
    try {
        const userProfile = await getUserById(req.body)
        res.send({userProfile})
    } catch (error) {
        next(error);
    }
})

// GET /api/users/:username/routines
router.get('/api/user/:username/routines', async(req, res) => {
    res.send('Success!')
    try {
        const userName = await getUserByUsername(req.body)
        res.send({userName})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
