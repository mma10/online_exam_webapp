const express = require('express');
const router = express.Router();

const admin = require('../controllers/adminController');

// Routes

router.get('/:admin_id/subjects/:token/', admin.findAllSubjects);

router.get('/:admin_id/:subject_id/students/:token/', admin.findSubjectStudent);

router.post('/:admin_id/:exam_id/exam/:token/', admin.submitQuestionPaper);

module.exports = router;
