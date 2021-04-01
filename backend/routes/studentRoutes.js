const express = require('express');
const router = express.Router();

const students = require('../controllers/studentController');

// Routes

router.get('/:student_id/subjects/', students.findStudentSubjects);

router.get('/:student_id/exams', students.findStudentExams);

router.post('/:exam_id/:student_id/exam', students.submitStudentExam);

router.get('/:student_id/result', students.findStudentResults);

module.exports = router;