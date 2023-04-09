const express = require('express');
const { getActivityById, getAllActivities } = require('../db/activities');
const { getPublicRoutinesByActivity } = require('../db/routines');
const router = express.Router();

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
// router.get('/', (req, res) => {

//     try {
    
//     } catch(err){
//         console.log(err)
//     }
    
//     })

// PATCH /api/activities/:activityId
// router.get('/:activityId', (req, res) => {

//     try {
    
//     } catch(err){
//         console.log(err)
//     }
    
    // })
module.exports = router;



