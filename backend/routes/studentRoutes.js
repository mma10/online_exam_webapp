const express = require('express');
const router = express.Router();

const students = require('../controllers/studentController');

// Routes

router.get('/:student_id/subjects/:token/', students.findStudentSubjects);

router.get('/:student_id/exams/:token/', students.findStudentExams);

router.get('/:subject_id/exam/:token/', students.findExamPaper);

router.post('/:exam_id/:student_id/exam/:token/', students.submitStudentExam);

router.get('/:student_id/results/:token/', students.findStudentResults);


module.exports = router;