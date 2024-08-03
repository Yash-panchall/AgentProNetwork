const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')


const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

adminSchema.pre('save' , async function(next){

  try{
    
    if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password , 10)
    }
  
    next()
  }catch(error){
    next(error)
  }

})


adminSchema.methods.createToken = async function(){

  try{

    const adminToken = await jwt.sign({_id : this._id , username : this.username } , process.env.JWT_SECRET_KEY )
    return adminToken

  }catch(err){
    console.log(err)
  }

}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
