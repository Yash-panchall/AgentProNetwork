const express = require('express');
const { getPublicProfile, getAgentPic } = require('../controllers/public-controller');
const router = express.Router();


router.route('/profile/:username/:id').get(getPublicProfile)
router.route('/profile-pic/:username/:id').get(getAgentPic)

module.exports = router;