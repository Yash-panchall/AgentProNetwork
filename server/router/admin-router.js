const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin-controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const paginationMiddleware = require('../middleware/pagination-middleware');
const singleUpload = require('../middleware/multerMiddleware');



router.route('/login').post(adminControllers.adminLogin)
router.route('/agents').get(authMiddleware, adminMiddleware , paginationMiddleware ,adminControllers.getAllAgents)
router.route('/agents/:id').get(authMiddleware, adminMiddleware , adminControllers.getAgentProfile)
router.route('/agents/profile-pic/:id').get(authMiddleware , adminMiddleware , adminControllers.getAgentProfilePicture).put( authMiddleware , singleUpload, adminControllers.updateAgentProfilePicture);
router.route('/agents/update/:id').patch(authMiddleware, adminMiddleware , adminControllers.UpdateAgentProfile)
router.route('/agents/status/:id').patch(authMiddleware , adminMiddleware , adminControllers.activeAgentProfile)
router.route('/agents/delete/:id').delete(authMiddleware, adminMiddleware , adminControllers.deleteAgentProfile)

module.exports = router;