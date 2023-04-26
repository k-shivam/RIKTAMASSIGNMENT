const jwt = require('jsonwebtoken');

const authenticateRoutes = (req, res, next) =>{
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        console.log(decoded)
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});
        if(!decoded.isAdmin){
            return res.status(401).send('User not authorized to add new user.')
        }else{
            next();
        }
    });
}

module.exports = authenticateRoutes;