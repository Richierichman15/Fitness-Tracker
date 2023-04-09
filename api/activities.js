const express = require('express');
const { getActivityById } = require('../db/activities');
const { getPublicRoutinesByActivity } = require('../db/routines');
const router = express.Router();

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res) => {
    // console.log('req.param..............',req.params);
try {
 const activity = await getActivityById(req.params.activityId);
 const routine = await getPublicRoutinesByActivity(activity);
//  console.log('routines.........',routine);
 res.send(routine);
} catch(err){
    console.log(err)
}

})

// GET /api/activities
// router.get('/', (res, req) => {

//     try {
    
//     } catch(err){
//         console.log(err)
//     }
    
//     })

// POST /api/activities
// router.get('/', (res, req) => {

//     try {
    
//     } catch(err){
//         console.log(err)
//     }
    
//     })

// PATCH /api/activities/:activityId
// router.get('/:activityId', (res, req) => {

//     try {
    
//     } catch(err){
//         console.log(err)
//     }
    
    // })
module.exports = router;



