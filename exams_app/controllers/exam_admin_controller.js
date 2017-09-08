const { Exam } = require('../models/exam')

module.exports = {
  displayExamsDashboard: displayExamsDashboard,
  displayExamsForm: displayExamsForm,
  saveOrUpdateExam: saveOrUpdateExam,
  deleteExam: deleteExam
}

function displayExamsDashboard (_, res) {
  Exam.fetchAll().then(exams => {
    res.render('exams_admin/dashboard', {
      exams: exams.models
    })
  })
}

function displayExamsForm (req, res) {
  if (req.params.id) {
    Exam.where(req.params).fetch(
      {withRelated: ['questions',
        'questions.questionType',
        'questions.questionTypeTrueFalse',
        'questions.questionTypeTextInput']
      })
      .then(exam => {
        const questions = exam.related('questions').models

        for (let i = 0; i < questions.length; i++) {
          questions[i].attributes.type = questions[i].relations.questionType.attributes.name

          if (questions[i].attributes.type === 'true_false') {
            questions[i].attributes.answer = questions[i].relations.questionTypeTrueFalse.attributes.answer
          } else if (questions[i].attributes.type === 'text_input') {
            questions[i].attributes.answer = questions[i].relations.questionTypeTextInput.attributes.answer
          }

          questions[i] = questions[i].attributes
        }

        res.render('exams_admin/create_update', {
          exam: exam.attributes,
          questions: questions
        })
      })
  } else res.render('exams_admin/create_update')
}

function saveOrUpdateExam (req, res) {
  if (req.params.id) {
    Exam.forge(req.params).save(req.body).then(() => res.redirect('/exams'))
  } else {
    Exam.forge(req.body).save().then(() => res.redirect('/exams'))
  }
}

function deleteExam (req, res) {
  if (req.params.id) {
    Exam.forge(req.params).destroy({require: true}).then(() => res.redirect('/exams'))
  }
}
