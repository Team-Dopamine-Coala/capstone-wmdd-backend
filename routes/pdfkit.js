const express = require('express')

const {
  getPdf
} = require('../controllers/pdfController')

const router = express.Router()

// Get pdf
router.get('/', getPdf)

module.exports = router