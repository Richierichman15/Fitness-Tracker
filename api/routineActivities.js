const express = require('express');
const router = express.Router();

const {
    getRoutineActivityById,
    updateRoutineActivity,
    destroyRoutineActivity
     } = require('../db/routine_activities');
const { getRoutineById } = require('../db/routines');
const { getActivityById } = require('../db/activities');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

// PATCH /api/routine_activities/:routineActivityId

router.patch('/:routineActivityId', async (req, res) => {

    const header = req.headers.authorization
    const { routineActivityId }= req.params
    const { count, duration } = req.body;
    
    try {

        const routineActivity = await getRoutineActivityById(routineActivityId)
        
        const { routineId } = routineActivity;
        const routine = await getRoutineById(routineId)
        if (header) {

            const token = req.headers.authorization.split(' ')[1];
            const verified = jwt.verify(token, SECRET_KEY); 

            if (verified.id === routine.creatorId) {
                await updateRoutineActivity(verified.id, { count: count, duration: duration })
                return res.send({ count: count, duration: duration})
            }

            if (verified.id != routine.creatorId){
                res.status(403).send({message: `User ${verified.username} is not allowed to update ${routine.name}`,
                error: "I am error",
                name: 'unauthorizedUser'
                })
            }


            }


} catch(err) {
    console.log(err);
}

});

// DELETE /api/routine_activities/:routineActivityId

router.delete('/:routineActivityId', async (req, res) => {
    const header = req.headers.authorization

    
    try{

        const { routineActivityId } = req.params
        const routineActivity = await getRoutineActivityById(routineActivityId)
        
        const { routineId, activityId, count, duration } = routineActivity;
        const routine = await getRoutineById(routineId)
        const activity = await getActivityById(activityId)
        const { id } = activity
        if (header) {

            const token = req.headers.authorization.split(' ')[1];
            const verified = jwt.verify(token, SECRET_KEY); 

            if (verified.id === routine.creatorId) {
                await destroyRoutineActivity(routineActivityId)
                return res.send({ 
                    activityId: id,
                    count: count,
                    duration: duration,
                    id: id,
                    routineId: routineId })
            }

            if (verified.id != routine.creatorId){
                res.status(403).send({message: `User ${verified.username} is not allowed to delete ${routine.name}`,
                error: "I am error",
                name: 'unauthorizedUser'
                })
            }


            }

    } catch(err) {
        console.log(err);
    }


})

module.exports = router;
