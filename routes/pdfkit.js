const express = require('express')

const {
  getPdf
} = require('../controllers/pdfController')

const router = express.Router()

// Get pdf report student of class
router.get('/:classid/:studentid', getPdf)
// Get pdf report of student
// router.get('/student/:studentid', getPdf)

module.exports = router