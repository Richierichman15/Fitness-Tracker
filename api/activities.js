const express = require('express');
const router = express.Router();
const { getAllActivities } = require('../db/activities');
// GET /api/activities/:activityId/routines

// GET /api/activities
router.get('/api/activities', async (req, res, next) => {
    try {
        const activitesGotten = await getAllActivities()
        console.log('activitiesGottennnnnnnn:', activitesGotten)
        res.send({ activitesGotten })
    } catch(err) {
        next(err);
    }
});
// POST /api/activities

// PATCH /api/activities/:activityId

module.exports = {
    router
}




// my code below, may be too soon to implement

// const express = require('express');
// const router = express.Router();
// const { getAllActivities } = require('../db/activities');
// // GET /api/activities/:activityId/routines
// // GET /api/activities
// router.get('/api/activities', async (req, res, next) => {
//     try {
//         const activitesGotten = await getAllActivities()
//         console.log('activitiesGottennnnnnnn:', activitesGotten)
//         res.send({ activitesGotten })
//     } catch(err) {
//         next(err);
//     }
// });
// // POST /api/activities
// // PATCH /api/activities/:activityId
// module.exports = {
//     router
// }