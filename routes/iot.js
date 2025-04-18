const express = require('express');
const router = express.Router();
const iotController = require('../controllers/iot');

router.post('/create', iotController.createIOTData);
router.get('/', iotController.getIOTData);

module.exports = router;