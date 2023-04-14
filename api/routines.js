const express = require('express');
const router = express.Router();
const { createRoutine,
        getRoutineById,
        getAllPublicRoutines,
        destroyRoutine 
        } = require('../db/routines')

const { addActivityToRoutine,
        getRoutineActivitiesByRoutine,
        getRoutineActivityById,destroyRoutineActivity
         } = require('../db/routine_activities')

const jwt = require('jsonwebtoken');
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
                if (header) {
                        const token = req.headers.authorization.split(' ')[1];
                        const verified = jwt.verify(token, SECRET_KEY); 
                        if (verified.id) {
                            await createRoutine(verified.id , isPublic, name, goal); /////this one
                            res.send({ creatorId: verified.id, isPublic: isPublic, name: name, goal: goal} )
                        } 
                }
                if (!header) {
                        res.send({message: "You must be logged in to perform this action",
                        error: "I am error",
                        name: "mustLogin"
                        })
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


//DELETE /api/routines/:routineId
router.delete('/:routineId', async (req, res) => {
        const header = req.headers.authorization 

        try {

        const routineId = await getRoutineById(req.params.routineId)

        if (header) {

                const token = req.headers.authorization.split(' ')[1];
                const verified = jwt.verify(token, SECRET_KEY); 
                
                if (verified.id === routineId.creatorId) {
                        console.log('users match');
                        

                        const routineExists = await getRoutineActivitiesByRoutine(routineId)
                        const routineActivity = routineExists
                        const routineActivityId = await getRoutineActivityById(routineActivity.id)
                        await destroyRoutineActivity(routineActivityId)
                        await destroyRoutine(routineId.id)
   
                    res.send({
                        id: routineId.id,
                        isPublic: routineId.isPublic,
                        goal: routineId.goal,
                        name: routineId.name,
                        creatorId: routineId.creatorId
                        })
                } 
                
                if (verified.id != routineId.id) {
                        res.status(403).send({message: `User ${verified.username} is not allowed to delete ${routineId.name}`,
                        error: "I am error",
                        name: 'unauthorizedUser'
                        })
                        
                }


        }




        
        } catch(err) {
                console.log(err);
        }
})

// POST /api/routines/:routineId/activities
router.post('/:routineId/activities', async (req, res) => {
        const header = req.headers.authorization 
        const { routineId }= req.params 
        const { activityId, count, duration } = req.body

        try {

                const routineExists = await getRoutineActivitiesByRoutine({ id: routineId })
                const routineActivity = routineExists[0]

                if (routineExists.length) {
                        const getRAID = await getRoutineActivityById(routineActivity.id)
               
                        if (header && getRAID){
                                return res.send({ 
                                        error: "I am error",
                                        message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
                                        name: "duplicateActivity"
                                        })
                        }
                  }

                if (header) {
                        const token = req.headers.authorization.split(' ')[1];
                        const verified = jwt.verify(token, SECRET_KEY); 
                        
                        if (verified.id) {
                            await addActivityToRoutine(routineId, activityId, count, duration );
                            res.send({ routineId: +routineId,
                                activityId: activityId,
                                count: count,
                                duration: duration
                                 })
                        }


                }
                

        } catch(err) {
        console.log(err);
        }


})
module.exports = router;
