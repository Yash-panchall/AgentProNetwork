const bcrypt = require('bcryptjs')
const Agent = require('../models/agent-model')
const Admin = require('../models/admin-model')
const getDataUri = require('../utils/feture')
const cloudinary = require('cloudinary')



// Admin Login API

const adminLogin = async(req,res) =>{

    try {
        
        const{username , password} = req.body;

        const adminExist = await Agent.findOne({username})
        // console.log(adminExist)

        if(!adminExist){
            return res.status(400).json({msg : "Invalid Credentials"})
        }

         const validPass =  await bcrypt.compare(password, adminExist.password)
        // console.log(validPass)

        if(validPass){
            res.status(200).json({
                msg : "Admin successful Login",
                token : await adminExist.generateToken(),
                _id : adminExist._id
            })
        }
        else{
            res.status(404).json({
                error : "invalid Password"
            })
        }

    } catch (error) {
        res.status(400).json({err : error})
    }
}



//Admin get AllAgents data
const getAllAgents = async function(req , res){

    try {
        const agents = await Agent.find().skip(req.skip).limit(req.limit);
        if(!agents){
            res.status(400).json({msg : "No agents Found"})
        }
        return res.status(200).json({agents , nbHits : agents.length})
    } catch (error) {
        res.status(404).json(error);
    }

}

//API to show perticular Agent Profile
const getAgentProfile = async function(req , res){
    try {

        const agentProfile = await Agent.findById(req.params.id);
        // console.log(req.params.id)
        if(!agentProfile){
            res.status(404).json({msg : "Agent Not Found"})
        }

        res.status(200).json(agentProfile)

    } catch (error) {
        res.status(500).send(err);
    }
}

// Upload API for upload agents profile_picture

const updateAgentProfilePicture = async (req, res) => {
    try {
        const user = await Agent.findById(req.params.id)
        // console.log(req.file)
        // console.log("this is users data" ,user)
        
        if (!user) {
            return res.status(404).json({ msg: "Agent not found" });
        }
        
        //after parse image get from req.file
        const file = getDataUri(req.file)
        // console.log(file)

        if (!file) {
            return res.status(400).json({ msg: "File not found" });
        }
        
        //delete previous profile from cloudinary 
        if(!!user.profile_picture_url.public_id){
            await cloudinary.v2.uploader.destroy(user.profile_picture_url.public_id)
        }

        //upload new profile
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        user.profile_picture_url = {
            public_id : cdb.public_id,
            url : cdb.secure_url
        }

        //save function
        const saveprofile = await user.save()

        res.status(200).json({
            msg : "profile Pic updated",
            profileImageUrl: user.profile_picture_url.url,
        })

    } catch (err) {
      res.status(500).json({"pic Error" : err});
    }
};



//Get agents profile-pic API
const getAgentProfilePicture = async (req, res) => {
    try {
      const user = await Agent.findById(req.params.id);
      res.status(201).json({
        profileImageUrl: user.profile_picture_url.url,
      });
    } catch (err) {
      res.status(500).json({ 'pic Error': err.message });
    }
};


//API to Update Agents Profile

const UpdateAgentProfile = async function(req , res){
    try {
        const updatedProfile = await Agent.findByIdAndUpdate(req.params.id , req.body , {new : true})
        
        if(!updatedProfile){
            res.status(404).json({msg : "Agent Not Found"})
        }

        res.status(200).json({
            msg : "successful profile Updated",
            body : updatedProfile
        })

    } catch (error) {
        res.status(500).send(error);
    }
}


//API to Avtive Agents

const activeAgentProfile = async (req , res) => {
    try {
        const _id = req.params.id;
        const isActive = req.body
    
        const agent = await Agent.findByIdAndUpdate(_id , isActive , {new : true})
    
        if(!agent){
            res.status(404).json({msg : "Agent Not Found"})
        }
    
        res.status(200).json({
            msg : "succesfull Update Active Or Deactive",
            body : agent
        })   
    } catch (error) {
        res.status(400).json({
            "msg" : error
        })
    }    

}




//API to Delete Agents Profile

const deleteAgentProfile = async function(req , res){

    try{
        const deleteProfile = await Agent.findByIdAndDelete(req.params.id)
        res.status(200).json({message : "Agent Successful Deleted"})
    }catch(error){
        res.status(400).json({msg : "Agent Not Deleted..!"})
    }

}

module.exports = {adminLogin , getAllAgents , getAgentProfile , getAgentProfilePicture, updateAgentProfilePicture , activeAgentProfile , UpdateAgentProfile , deleteAgentProfile}