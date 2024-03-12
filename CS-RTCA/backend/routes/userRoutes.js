const express = require('express');
const { registerUser, authUser, allUsers } = require('../controlers/userController');
const { protect } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);
// router.route('/).get(allUsers)


module.exports = router;