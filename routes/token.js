const jwt = require('jsonwebtoken');
const jwtConfig = require('../config.json');

function verifyToken(req, res, next) {
    const authorization = req.headers['authorization'];
    
    if (typeof authorization !== 'undefined'){
        jwt.verify(authorization, jwtConfig.jwtKey, (err, tokenData) => {
            if (err){
                res.sendStatus(422);
            } else {
                req.token = authorization;  
                req.tokenData = tokenData;
                next();
            }
        });  
    } else {
        res.sendStatus(401);
    }
}

module.exports.verifyToken = verifyToken;