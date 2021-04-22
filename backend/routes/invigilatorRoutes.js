const express = require('express');
const router = express.Router();

const invigilator = require('../controllers/invigilatorController');

// Routes

router.get('/:invigilator_id/exams',invigilator.findInvigilatorExams);

module.exports = router;