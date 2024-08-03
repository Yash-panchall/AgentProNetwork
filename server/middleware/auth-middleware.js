const jwt = require('jsonwebtoken');
const Agent = require('../models/agent-model');


//authentication Middleware to check user is login Or Not Login

const authMiddleware = async(req , res , next ) =>{

    //token comes from frontend, when agent login
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({
            msg : "Unauthorized HTTP Requiest , Token Not Provided"
        })
    }

    // console.log("token from authMiddleware" , token)

    const jwtToken = token.replace("Bearer","").trim();
    // console.log(jwtToken)

    try {
        
        const isVerified = jwt.verify(jwtToken , process.env.JWT_SECRET_KEY)
        // console.log(isVerified)

        const agentProfile = await Agent.findById(isVerified._id)
        // console.log(agentProfile)

        req.profile = agentProfile;
        req.token = token;
        req.agentId = agentProfile._id;
        // console.log(agentProfile._id)

        next();
    } catch (error) {
        res.status(404).json({msg : "Unauthorized , Invalid Token"})
    }


}

module.exports = authMiddleware