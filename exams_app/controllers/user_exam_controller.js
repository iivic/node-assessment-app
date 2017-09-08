const { Exam } = require('../models/exam')
const { User, UserAnswer } = require('../models/user')

module.exports = {
  listAllExams: listAllExams,
  showQuestions: showQuestions,
  saveUserAnswers: saveUserAnswers
}

function listAllExams (_, res) {
  Exam.fetchAll().then(exams => {
    res.render('user_exams/dashboard', {
      exams: exams.models
    })
  })
}

function showQuestions (req, res) {
  Exam.where(req.params).fetch({withRelated: ['questions', 'questions.questionType']})
    .then(exam => {
      const questions = exam.related('questions').models

      questions.forEach(question => {
        question.attributes.type = question.related('questionType').attributes.name
      })

      res.render('user_exams/exam_questions', {
        exam: exam.attributes,
        questions: questions
      })
    })
}

function saveUserAnswers (req, res) {
  const data = req.body

  for (let i = 0; i < data.question_ids.length; i++) {
    UserAnswer.forge({user_id: req.user.id, question_id: data.question_ids[i], text: data.answers[i]}).save()
    User.where({id: req.user.id}).fetch().then(user => user.exams().attach([data.exam_id]))
  }

  res.redirect('/dashboard')
}
