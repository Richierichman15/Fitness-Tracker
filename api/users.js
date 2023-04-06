/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const {createUser, getUser, getUserById, getUserByUsername } = require('../db/users.js')

// POST /api/users/register
router.get('/users/register', async(req, res, next) => {
    try {
        const creatingUser = await createUser()
        console.log('here', creatingUser);
        res.send({creatingUser})
    } catch (error) {
        console.log(error)
        next()
    }
})

// POST /api/users/login


// GET /api/users/me


// GET /api/users/:username/routines


module.exports = router;
