const express = require('express');
const { getActivityById, getAllActivities, createActivity, getActivityByName, updateActivity } = require('../db/activities');
const { getPublicRoutinesByActivity } = require('../db/routines');
const router = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res) => {
    // console.log('req.param..............',req.params);
try {


 const activity = await getActivityById(req.params.activityId);
 if (!activity) {
    res.send({
        error:"I am error",
        message: `Activity ${req.params.activityId} not found`,
        name: "NoActivity"
    })
 }
 const routine = await getPublicRoutinesByActivity(activity);
 res.send(routine);
} catch(err){
    console.log(err)
}

})

// GET /api/activities
router.get('/', async (req, res) => {
    
    try {
    const activities = await getAllActivities();
    res.send(activities);
    } catch(err){
        console.log(err)
    }
    
    })

// POST /api/activities
router.post('/', async (req, res) => {

    try {
        const header = req.headers.authorization;
        const { name, description } = req.body
        const allActivities = await getActivityByName(name);
        if (allActivities) {
            res.send({message: `An activity with name ${name} already exists`, error: "activityExists", name: "activityExists"});
        }
        if (header && !allActivities) {

            const token = req.headers.authorization.split(' ')[1];
            const verified = jwt.verify(token, SECRET_KEY);
            if (verified.username ) {
                await createActivity(name, description);
                res.send({ description: req.body.description, name: req.body.name})
            }
        }
    } catch(err){
        console.log(err)
    }
    
    })

// PATCH /api/activities/:activityId
router.patch('/:activityId', async (req, res) => {
    const { activityId }= req.params;
    console.log('activityid...............', req.params);
    const { name, description } = req.body;
    const header = req.headers.authorization;
    console.log('.........body...', req.body);

    try {
        if (header) {

            const token = req.headers.authorization.split(' ')[1];
            const verified = jwt.verify(token, SECRET_KEY);

            if (verified) {
                console.log('.........made it here.............activiID',activityId);
                const update = await updateActivity(activityId, {name, description});
                console.log('........update.......', update);
                res.send({ description: description, id: activityId, name: name})
             }
        }
        

    } catch(err) {
        console.log(err)
    }
    
    })
module.exports = router;



