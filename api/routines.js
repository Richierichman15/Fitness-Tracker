const express = require('express');
const router = express.Router();
const { getAllRoutines, createRoutine, getRoutineById, getPublicRoutinesByActivity } = require('../db/routines')
const { addActivityToRoutine, getRoutineActivitiesByRoutine } = require('../db/routine_activities')
const jwt = require('jsonwebtoken');
const { getActivityById } = require('../db');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;


// GET /api/routines
router.get('/', async (req, res) => {
   
try{
        const newUser = await getAllRoutines()
                res.send(newUser);
} catch(err) {
        console.log(err);
}

});
// POST /api/routines

router.post('/', async (req, res) => {
        try {
                const header = req.headers.authorization
                const { isPublic, name, goal } = req.body

                if (header) {
                        const token = req.headers.authorization.split(' ')[1];
                        const verified = jwt.verify(token, SECRET_KEY); 

                        if (verified.id) {
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
router.post('/:routineId/activities', async (req, res) => {
        try {
                const header = req.headers.authorization
                const routineId = +req.params.routineId
                const { activityId, count, duration } = req.body
                const check = await getRoutineActivitiesByRoutine({routineId});
                console.log('..........check',check);

                if (header) {
                        const token = req.headers.authorization.split(' ')[1];
                        const verified = jwt.verify(token, SECRET_KEY); 

                        if (check){
                                res.send({ error: "I am error", message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`, name: "duplicateActivity"})
                        }

                        if (verified.id) {
                            await addActivityToRoutine(routineId, activityId, count, duration );
                            res.send({ routineId: routineId, activityId: activityId, count: count, duration: duration })
                        }
                } else {res.send({message: "You must be logged in to perform this action", error: "I am error", name: "mustLogin"})}

        } catch(err) {
        console.log(err);
        }


})
module.exports = router;
