const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth-controller');
// const validate = require('../middleware/validate-middleware');  //use for zod
// const agentSchema = require('../validator/agent-validator');  //use for zod
const authMiddleware = require('../middleware/auth-middleware');
const singleUpload = require('../middleware/multerMiddleware');




// router.get('/' , (req , res)=>{
//     res.status(200).send("Hi from the router server side")
// })


router.route('/register').post(authControllers.register)
router.route('/login').post(authControllers.login)
router.route('/profile-pic').get(authMiddleware , authControllers.getProfilePicture).put( authMiddleware , singleUpload ,authControllers.updateProfilePicture);
router.route('/profile').get(authMiddleware ,authControllers.AgentProfile).patch(authMiddleware ,authControllers.AgentUpdate)


module.exports = router;