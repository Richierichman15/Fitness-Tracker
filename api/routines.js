const express = require('express');
const router = express.Router();
const { getRoutineById, getRoutinesWithoutActivities, getAllRoutines, getAllPublicRoutines, getAllRoutinesByUser, getPublicRoutinesByUser, getPublicRoutinesByActivity, createRoutine, updateRoutine, destroyRoutine } = require('../db/routines.js') 

// GET /api/routines
router.get('/routines', async(req, res, next) => {
    res.send('Loading routines...');
    const { id } = req.body.iq
    try {
        const getPublicRoutines = await getAllPublicRoutines(req.body);
        const getPublicActivity = await getPublicRoutinesByActivity(req.body.id);
        res.send(getPublicRoutines);
        res.send(getPublicActivity);
    } catch (error) {
        next(error);
    }
})
// POST /api/routines
router.post('/routines', async(req, res, next) => {
    res.send('Loading post...')
})


// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;
