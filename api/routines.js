const express = require('express');
const router = express.Router();
const { getRoutineById, getRoutinesWithoutActivities, getAllRoutines, getAllPublicRoutines, getAllRoutinesByUser, getPublicRoutinesByUser, getPublicRoutinesByActivity, createRoutine, updateRoutine, destroyRoutine } = require('../db/routines.js') 

// GET /api/routines
router.get('/routines', async(req, res, next) => {
    res.send('Loading routines...');
    try {
        const getPublicRoutines = await getAllPublicRoutines(req.body);
        const getPublicActivity = await getPublicRoutinesByActivity(req.body);
        res.send(getPublicRoutines);
        res.send(getPublicActivity);
    } catch (error) {
        next(error);
    }
})
// POST /api/routines

// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;
