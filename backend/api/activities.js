const express = require('express');
const { getActivityById, getAllActivities, createActivity, getActivityByName, updateActivity } = require('../db/activities');
const { getPublicRoutinesByActivity } = require('../db/routines');
const router = express.Router();

router.get('/:activityId/routines', async (req, res) => {
    try {

        const activity = await getActivityById(req.params.activityId);
        
        if (!activity) {
            res.send({
                error: "I am error",
                message: `Activity ${req.params.activityId} not found`,
                name: "NoActivity"
            })
        }
        if (activity) {
            const routine = await getPublicRoutinesByActivity(activity);
            res.send(routine);
        }

    } catch (err) {
        console.log(err)
    }

})

// GET /api/activities
router.get('/', async (req, res) => {

    try {
        const activities = await getAllActivities();
        res.send(activities);
    } catch (err) {
        console.log(err)
    }

})

// POST /api/activities
router.post('/', async (req, res) => {

    try {
        const { name, description } = req.body
        const allActivities = await getActivityByName(name);

        if (allActivities) {
            res.send({ message: `An activity with name ${name} already exists`, error: "activityExists", name: "activityExists" });
        }

        if (req.user && !allActivities) {
                await createActivity(name, description);
                res.send({ description: req.body.description, name: req.body.name })
            // }
        }

    } catch (err) {
        console.log(err)
    }

})

// PATCH /api/activities/:activityId
router.patch('/:activityId', async (req, res) => {
    const activityId = +req.params.activityId;
    const { name, description } = req.body; 
    const getAct = await getActivityByName(name);
    const getId = await getActivityById(activityId);

    if (getAct) {
        return res.send({ error: "I am error", message: `An activity with name ${name} already exists`, name: "activityAlreadyExists" })
    }

    if (!getId) {
        return res.send({ error: "I am error", message: `Activity ${activityId} not found`, name: "noActivityToUpdate" })
    }
    try {
        if (req.user) {

                      await updateActivity(activityId, { name, description });
                res.send({ description: description, id: activityId, name: name })
                }

    } catch (err) {
        console.log(err)
    }

})
module.exports = router;



