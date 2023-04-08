const express = require('express');
const router = express.Router();
const { getAllRoutines } = require('../db/routines')
// GET /api/routines
router.get('/', async (req, res) => {
   
       
        const newUser = await getAllRoutines()
        console.log('getallrountines returns.....', newUser)
        res.send(newUser);

});
// POST /api/routines

// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;
