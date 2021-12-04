const jwt = require('jsonwebtoken');

function verify(req, res, next) {
    const authHeader = req.headers.token 
    if (authHeader){
        const token = authHeader.split(" ")[1]

        jwt.verify(token, process.env.secretKey, (err, user) => {
            if(err) res.status(400).json("Token is not valid");
            req.user = user
            next()
        })
    }else{
        return res.status(400).json("not authenticated")
    }
}

module.exports = verify