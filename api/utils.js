const requireUser =((req, res, next) => {
  console.log('REQUIREUSER...........');
    if (!req.user) {
      res.status(401)
      res.send({
        name: "unauthorized Error",
        message: "You must be logged in to perform this action",
        error: 'unauthorizedError'
      });
      return;
    }
    next();
}) 

module.exports = requireUser;