const jwt = require('jsonwebtoken');
const JwtDecode = require("jwt-decode");

const prisma = require('../utils/prisma');

module.exports = (role) => async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) 
        return res.status(401).json({message: 'Access token Missing'});
    
    try {
        const decoded = JwtDecode(token);
        const user = await prisma.users.findUnique({where: { id: decoded.id }});
        const DBtoken = await prisma.token.findUnique({where: { id: decoded.tokenId }});

        if(!DBtoken)
            return res.status(401).json({message: 'Token is invalid'});
        
        jwt.verify(token, process.env.TOKEN_SECRET, async (err) => {
            if (err) {
                return res.status(401).json({message: "Token error - " + err.message});
            } else {
                if(!role.includes(user.role))
                    return res.status(401).json({message: 'Access Denied'});

                req.user  = user;
                req.token = DBtoken;

                next();
            }
        });
    }
    catch(e) {
        if(e instanceof JwtDecode.InvalidTokenError)
            res.status(401).json({message:"Token error - Invalid access token"});
        else {
            console.log(e);
            res.status(500).json({message:"Internal server error"});
        }
    }
}