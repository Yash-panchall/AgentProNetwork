// create Function which is called when perticular requiest arrvie for any task 

const Agent = require('../models/agent-model')
const bcrypt = require('bcryptjs');

//to upload profile-pc
const getDataUri = require('../utils/feture');
const cloudinary = require('cloudinary');


// Agent Registration Logic

const register = async(req , res) => {
    try {

        // Check if an agent with the same email or phone number already exists
        const existingAgent = await Agent.findOne({
            $or: [{ email: req.body.email }, { phone_number: req.body.phone_number }]
        });
        
        if (existingAgent) {
            return res.status(400).json({ error: 'An agent with this email or phone number already exists.' });
        }

        //create New Agent
        const newAgent = new Agent(req.body);

        const savedAgent = await newAgent.save();

        res.status(201).json({
            msg : "agent successful registered",
            token : await savedAgent.generateToken(),
            _id : savedAgent._id
        });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}



//Agent Login API

const login = async(req , res) => {

    const{username , password} = req.body;
    
    const agentExist = await Agent.findOne({username})

    if(!agentExist){
        return res.status(400).json({msg : "Invalid Credentials"})
    }

    const validPass =  await bcrypt.compare(password, agentExist.password)

    if(validPass){
        res.status(200).json({
            msg : "agent successful Login",
            token : await agentExist.generateToken(),
            _id : agentExist._id
        })
    }
    else{
        res.status(400).json({
            error : "invalid Password"
        })
    }

}

// Upload API profile_picture

const updateProfilePicture = async (req, res) => {
    try {
        const user = await Agent.findById(req.agentId)
        // console.log(user)
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
        // console.log(cdb)
        user.profile_picture_url = {
            public_id : cdb.public_id,
            url : cdb.secure_url
        }

        //save function
        const saveprofile = await user.save()
        // console.log(saveprofile)

        res.status(200).json({
            msg : "profile Pic updated",
            profileImageUrl: user.profile_picture_url.url,
        })

    } catch (err) {
      res.status(500).json({"pic Error" : err});
    }
};


//Fetch Profile_pic API

const getProfilePicture = async (req, res) => {
    try {
      const user = await Agent.findById(req.agentId);
      res.status(201).json({
        profileImageUrl: user.profile_picture_url.url,
      });
    } catch (err) {
      res.status(500).json({ 'pic Error': err.message });
    }
};


//Fetch API to show agent profile data
const AgentProfile = async function(req , res){
    try {

        const agentProfile = await Agent.findById(req.agentId);
        // const agentProfile = req.profile;

        //generate Public_url for agent
        const username = agentProfile.username;
        const id = agentProfile._id
        const public_url = `${process.env.FRONTENDDOMAIN}/agent/profile/${username}/${id}`

        //store in DATABASE
        agentProfile.listing_url = public_url;
        const agentdata = await agentProfile.save()
        // console.log(agentProfile)

        if(!agentProfile){
            res.status(404).json({"msg" : "Agent Not Found"})
        }

        res.status(200).json(agentProfile)

    } catch (error) {
        res.status(500).send(err);
    }
}


//Api To update agent Profile
const AgentUpdate = async function(req , res){
    try {

        //here the Id is Come From auth-middleware
        const updatedProfile = await Agent.findByIdAndUpdate(req.agentId , req.body , {new : true})
        
        if(!updatedProfile){
            res.status(404).json({msg : "To update Agent profile Agent not Found"})
        }

        res.status(200).json({
            msg : "successful profile Updated",
            body : updatedProfile
        })

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {register , login , updateProfilePicture , getProfilePicture , AgentProfile , AgentUpdate} 