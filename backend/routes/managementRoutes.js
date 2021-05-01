const express = require('express');
const router = express.Router();

const management = require('../controllers/managementController');

const auth = require('../controllers/authController');


// Routes
router.get('/students/:token/',management.findAllStudents);

router.get('/admins/:token/',management.findAllAdmins);

router.get('/exams/:token/',management.findAllExams);

router.get('/invigilators/:token', management.findAllInvigilators);

router.get('/setNextAcademicYear/:token/',management.setNextAcademicYear);

router.post('/student/:token/',management.addStudent);

router.post('/admin/:token/',management.addAdmin);

router.post('/invigilator/:token/',management.addInv);

router.put('/exam/:token/', management.checkExamTime);

router.put('/:inv_id/:exam_id/invigilator/:token/',management.assgnExam);

router.delete('/:student_id/student/:token/',management.deleteStudent);

router.delete('/:admin_id/admin/:token/',management.deleteAdmin);

router.delete('/:exam_id/exam/:token/',management.deleteExam);

router.delete('/:inv_id/invigilator/:token',management.deleteInv);

router.delete('/:inv_id/:exam_id/invigilator/:token/',management.rmvExam);

module.exports = router;