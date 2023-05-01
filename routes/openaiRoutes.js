const express = require('express');
const {generateImage} = require('../controladores/openaiControlador')
const router = express.Router();
 
router.post('/generateimage',generateImage);
module.exports = router; 


