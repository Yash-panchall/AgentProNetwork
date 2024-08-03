const Agent = require("../models/agent-model")



const getPublicProfile = async(req ,res) => {

    try {
        const{username , id} = req.params;
        const agentData = await Agent.findOne({username ,_id : id})
    
        if(!agentData){
            res.status(400).json({'msg' : "Agent Not Found"})
        }else{
            res.status(200).json(agentData)
        }
    
    } catch (error) {
        res.status(404).json(error)
    }

}

const getAgentPic = async(req , res) => {

    try {
        const _id = req.params.id
        const user = await Agent.findById(_id);
        res.status(201).json({
            profileImageUrl: user.profile_picture_url.url,
        });
    }catch (err) {
        res.status(500).json({ 'pic Error': err.message });
    }
}

module.exports = {getPublicProfile , getAgentPic}