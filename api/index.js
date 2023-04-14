const express = require('express');
const router = express.Router();
const { getUserById } = require('../db/users')
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


      // GET /api/health
router.get('/health', async (req, res, next) => {
    res.send({message: 'Server is up.'})
    next();
});


router.use(async (req, res, next) => {
        const prefix = 'Bearer ';
        const auth = req.header('Authorization');
    // console.log('req.body......',req.body);
    const { username, password } = req.body;
        if (!auth) {
            next();
        } else if (auth.startsWith(prefix)) {
            const token = auth.slice(prefix.length);
    
            try {
                const { id } = jwt.verify(token, JWT_SECRET);
    // console.log('verify?.........',jwt.verify(token, JWT_SECRET));
                if (id) {
                    req.user = await getUserById(id);
                   
                }
                // console.log('req.user........',req.user);
                next();
            } catch ({ name, message }) {
                next({ name, message });
            }
        } else {
            next({
                name: 'AuthorizationHeaderError',
                message: `Authorization token must start with ${prefix}`
            });
        }
    });


        // ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

        // ROUTER: /api/activities
const activitiesRouter = require('./activities');
router.use('/activities', activitiesRouter);

         // ROUTER: /api/routines
const routinesRouter = require('./routines');
router.use('/routines', routinesRouter);

           // ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
router.use('/routine_activities', routineActivitiesRouter);


module.exports = router;