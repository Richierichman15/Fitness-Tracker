const express = require('express');
const router = express.Router();
const { createRoutine,
        getRoutineById,
        getAllPublicRoutines,
        destroyRoutine,
        updateRoutine
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
                        return res.send(newUser);
        } catch(err) {
                console.log(err);
        }

});
// POST /api/routines

router.post('/', async (req, res) => {

        try {
                const { isPublic, name, goal } = req.body
                
                if (req.user) {
                            await createRoutine(req.user.id , isPublic, name, goal);
                            return res.send({
                                creatorId: req.user.id,
                                isPublic: isPublic,
                                name: name,
                                goal: goal} )
                        }
                
                if (!req.user) {
                        res.status(403).send({message: "You must be logged in to perform this action",
                        error: "I am error",
                        name: "mustLogin"
                        })
                        }

        } catch(err) {
        console.log(err);
        }


})

// PATCH /api/routines/:routineId
router.patch('/:routineId', async (req, res) => {

        const header = req.headers.authorization 
        const { isPublic, name, goal } = req.body;
        const routineId = req.params
        try {

                if (header && routineId) {
                        const routine = await getRoutineById(routineId.routineId)
                        const token = req.headers.authorization.split(' ')[1];
                        const verified = jwt.verify(token, SECRET_KEY); 

                        if (verified.id === routine.creatorId) {
       
                                await updateRoutine(verified.id, {
                                        name: name,
                                        goal: goal,
                                        isPublic: isPublic
                                        })

                                return res.send({
                                        name: name,
                                        goal: goal,
                                        isPublic: isPublic
                                        })
                        } 
                        
                        if (verified.id != routine.creatorId) {
                                res.status(403).send({message: `User ${verified.username} is not allowed to update ${routine.name}`,
                                error: "I am error",
                                name: 'unauthorizedUser'
                                })
                                
                        }
        

                }
                if (!header){
                        return res.send({ 
                                message: 'You must be logged in to perform this action',
                                name: 'needsLoggedIn',
                                error: 'I am error'
                        })
                }
        } catch(err) {
                console.log(err);
        }
})

//DELETE /api/routines/:routineId
router.delete('/:routineId', async (req, res) => {
        
        const header = req.headers.authorization 

        try {

        const routineId = await getRoutineById(req.params.routineId)

        if (header) {

                const token = req.headers.authorization.split(' ')[1];
                const verified = jwt.verify(token, SECRET_KEY); 
                
                if (verified.id === routineId.creatorId) {

                        const routineExists = await getRoutineActivitiesByRoutine(routineId)
                        const routineActivity = routineExists
                        const routineActivityId = await getRoutineActivityById(routineActivity.id)
                        await destroyRoutineActivity(routineActivityId)
                        await destroyRoutine(routineId.id)
   
                   return res.send({
                        id: routineId.id,
                        isPublic: routineId.isPublic,
                        goal: routineId.goal,
                        name: routineId.name,
                        creatorId: routineId.creatorId
                        })
                } 
                
                if (verified.id != routineId.id) {
                        console.log('is this working?');
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
                        const getRoutineActivityId = await getRoutineActivityById(routineActivity.id)
               
                        if (header && getRoutineActivityId){
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
                            return res.send({ routineId: +routineId,
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
