const express = require('express')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => res.send('estas en index'))



module.exports = router