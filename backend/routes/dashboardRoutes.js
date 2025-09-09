const express = require('express');
const { protect } = require('../middleware/authMiddelware');
const {getDashboardData}= require("../controller/dashboardController")



const router = express.Router();

router.get('/', protect, getDashboardData);

module.exports = router;