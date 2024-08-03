const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const addressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zip_code: { type: String },
  country: { type: String }
});

const agencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: addressSchema,
  contact_number: { type: String, required: true }
});

const socialMediaSchema = new mongoose.Schema({
  linkedin: { type: String },
  facebook: { type: String },
  twitter: { type: String }
});

const agentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true, unique: true },
  address: addressSchema,
  license_number: { type: String, required: true },
  license_expiration_date: { type: Date, required: true },
  agency: agencySchema,
  years_of_experience: { type: Number, required: true },
  specializations: { type: [String], required: true },
  profile_picture_url: { public_id :{type : String}, url : {type : String} },
  social_media: socialMediaSchema,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
  company: { type: String },
  company_url: { type: String },
  listing_url: { type: String },
  testimonial: { type: String },
  video_link: { type: String },
  education_and_credentials: { type: String },
  about: { type: String },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Create Web Token
agentSchema.methods.generateToken = async function(){

  try{
    const agentToken = await jwt.sign({_id : this._id , email : this.email , isAdmin : this.isAdmin } , process.env.JWT_SECRET_KEY );
    return agentToken;
  } catch(err){
    console.log(err);
  }
}

// Create Uniqe Identifier for PublicUrl
// agentSchema.pre('save' , async function(next){
//   try {
//     const PublicUrl = uuidv4();
//     this.listing_url = PublicUrl;
//   } catch (error) {
//     console.log(error)
//   }
// })


// Secure Password using Bcrypt
agentSchema.pre('save' , async function(next){

  try{
    if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password , 10);
    }
    next();
  } catch(error){
    next(error);
  }
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;