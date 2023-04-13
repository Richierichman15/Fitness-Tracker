const express = require('express');
const router = express.Router();
const { getAllRoutines, createRoutine, getRoutineById, getPublicRoutinesByActivity, getAllPublicRoutines } = require('../db/routines')
const { addActivityToRoutine, getRoutineActivitiesByRoutine, getRoutineActivityById } = require('../db/routine_activities')
const jwt = require('jsonwebtoken');
const { getActivityById } = require('../db');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;


// GET /api/routines
router.get('/', async (req, res) => {
   
try{
        const newUser = await getAllPublicRoutines()
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
console.log('header.........',header);
                if (header) {
                        const token = req.headers.authorization.split(' ')[1];
                        const verified = jwt.verify(token, SECRET_KEY); 
console.log('token',token);
                        console.log('verified.1............',verified.username, 'name:',name);
                        if (verified.id) {
                                console.log('verified.2...........',verified, 'veri.id',verified.id, 'veri.name,',verified.name,'name',name);
                            await createRoutine(verified.id , isPublic, name, goal); //
                            res.send({ creatorId: verified.id, isPublic: isPublic, name: name, goal: goal} )
                        } else {
                                res.send({message: "You must be logged in to perform this action", error: "I am error", name: "mustLogin"})
                        }
                }
                if (!header) {
                        console.log('no header.....',header);
                        res.send({message: "You must be logged in to perform this action", error: "I am error", name: "mustLogin"})
                        }

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
// router.post('/:routineId/activities', async (req, res) => {
//         try {
//                 const header = req.headers.authorization
//                 const routineId = req.params.routineId
//                 const { activityId, count, duration } = req.body
//                 console.log('routineId.........1',routineId);
//                 const check = await getRoutineActivitiesByRoutine(+routineId)
//                 console.log('............routine.no if...3',check);
//                 if (header) {
//                         const token = req.headers.authorization.split(' ')[1];
//                         const verified = jwt.verify(token, SECRET_KEY); 

//                         if (check){
//                                 res.send({ 
//                                         error: "I am error",
//                                         message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
//                                         name: "duplicateActivity"
//                                         })
//                         }

//                         if (verified.id) {
//                             await addActivityToRoutine(routineId, activityId, count, duration );
//                             res.send({ routineId: +routineId, activityId: activityId, count: count, duration: duration })
//                         }
//                 } else {res.send({message: "You must be logged in to perform this action", error: "I am error", name: "mustLogin"})}

//         } catch(err) {
//         console.log(err);
//         }


// })
module.exports = router;
