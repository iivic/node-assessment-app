const { Router } = require('express')
const passport = require('passport')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const UserAdminController = require('../controllers/user_admin_controller')
const ExamAdminController = require('../controllers/exam_admin_controller')
const QuestionController = require('../controllers/question_controller')
const UserExamController = require('../controllers/user_exam_controller')

/*
 *  GET http://localhost:8000/
 *  GET http://localhost:8000/login
 *  POST http://localhost:8000/login
 *  GET http://localhost:8000/logout
 */

module.exports = Router()
  .get('/', ensureLoggedIn('/login'), (req, res) => res.render('index'))
  .get('/login', ensureLoggedOut('/'), (req, res) => res.render('login'))
  .post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))
  .get('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
  })

  // User admin urls
  .get('/users', UserAdminController.displayUsersDashboard)
  .get('/users/create', UserAdminController.displayUsersForm)
  .get('/users/:id', UserAdminController.displayUsersForm)
  .post('/users/create', UserAdminController.saveOrUpdateUser)
  .post('/users/:id', UserAdminController.saveOrUpdateUser)
  .get('/users/delete/:id', UserAdminController.deleteUser)

  // Exam admin urls
  .get('/exams', ExamAdminController.displayExamsDashboard)
  .get('/exams/create', ExamAdminController.displayExamsForm)
  .post('/exams/create', ExamAdminController.saveOrUpdateExam)
  .get('/exams/:id', ExamAdminController.displayExamsForm)
  .post('/exams/:id', ExamAdminController.saveOrUpdateExam)
  .get('/exams/delete/:id', ExamAdminController.deleteExam)

  // Question urls
  .post('/questions/create', QuestionController.saveOrUpdateQuestion)
  .post('/questions/:id', QuestionController.saveOrUpdateQuestion)
  .post('/questions/delete/:id', QuestionController.deleteQuestion)

  // Exams dashboard
  .get('/dashboard', ensureLoggedIn('/login'), UserExamController.listAllExams)
  .get('/exam/:id', ensureLoggedIn('/login'), UserExamController.showQuestions)
  .post('/exam/save', ensureLoggedIn('/login'), UserExamController.saveUserAnswers)
