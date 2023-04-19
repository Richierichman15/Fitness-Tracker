const express = require('express');
const router = express.Router();
const {
    getRoutineActivityById,
    updateRoutineActivity,
    destroyRoutineActivity
     } = require('../db/routine_activities');
const { getRoutineById } = require('../db/routines');
const { getActivityById } = require('../db/activities');

router.patch('/:routineActivityId', async (req, res) => {
    const { routineActivityId }= req.params
    const { count, duration } = req.body;
    
    try {
        const routineActivity = await getRoutineActivityById(routineActivityId)
        const { routineId } = routineActivity;
        const routine = await getRoutineById(routineId)

            if (req.user.id === routine.creatorId) {
                await updateRoutineActivity(req.user.id, { count: count, duration: duration })
                return res.send({ count: count, duration: duration})
            }

            if (req.user.id != routine.creatorId){
                res.status(403).send({message: `User ${req.user.username} is not allowed to update ${routine.name}`,
                error: "I am error",
                name: 'unauthorizedUser'
                })
            }

} catch(err) {
    console.log(err);
}

});

// DELETE /api/routine_activities/:routineActivityId

router.delete('/:routineActivityId', async (req, res) => {

    
    try{

        const { routineActivityId } = req.params
        const routineActivity = await getRoutineActivityById(routineActivityId)
        const { routineId, activityId, count, duration } = routineActivity;
        const routine = await getRoutineById(routineId)
        const activity = await getActivityById(activityId)
        const { id } = activity
        // if (req.user) {

            if (req.user.id === routine.creatorId) {
                await destroyRoutineActivity(routineActivityId)
                return res.send({ 
                    activityId: id,
                    count: count,
                    duration: duration,
                    id: +routineActivityId,
                    routineId: routineId })
            }

            if (req.user.id != routine.creatorId){
                res.status(403).send({message: `User ${req.user.username} is not allowed to delete ${routine.name}`,
                error: "I am error",
                name: 'unauthorizedUser'
                })
            }

    } catch(err) {
        console.log(err);
    }
})

module.exports = router;
