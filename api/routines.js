const express = require('express');
const router = express.Router();
const { getAllRoutines, createRoutine } = require('../db/routines')

const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;


// GET /api/routines
router.get('/', async (req, res) => {
   
       
        const newUser = await getAllRoutines()
        // console.log('getallrountines returns.....', newUser)
        res.send(newUser);

});
// POST /api/routines

router.post('/', async (req, res) => {
        try {
                const header = req.headers.authorization
                const { isPublic, name, goal } = req.body
                console.log('...params...', isPublic, name, goal);
                // const getRoutines = await getAllRoutines();
                // console.log('........getroutines......',getRoutines);
                console.log('...header....',header);
                if (header) {
                        console.log('.......getroutiens true........');
                        const token = req.headers.authorization.split(' ')[1];
                        const verified = jwt.verify(token, SECRET_KEY);
                        
                        if (verified.id) {
                                console.log('........verified..id?..',verified.id);
                            await createRoutine(verified.id , isPublic, name, goal);
                            res.send({ creatorId: verified.id, isPublic: isPublic, name: name, goal: goal} )
                        }
                } else {res.send({message: "You must be logged in to perform this action", error: "I am error", name: "mustLogin"})}

        } catch(err) {
        console.log(err);
        }


})

// PATCH /api/routines/:routineId
// router.patcht('/', async (req, res) => {
//         try {
        
//         } catch(err) {
//                 console.log(err);
//         }
// DELETE /api/routines/:routineId
// router.delete('/', async (req, res) => {
//         try {
        
//         } catch(err) {
//                 console.log(err);
//         }
// POST /api/routines/:routineId/activities
// router.post('/', async (req, res) => {
//         try {
        
//         } catch(err) {
//                 console.log(err);
//         }
module.exports = router;
