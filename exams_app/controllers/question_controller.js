const { Question, QuestionType, QuestionTypeTextInput,
  QuestionTypeTrueFalse } = require('../models/question')

module.exports = {
  saveOrUpdateQuestion: saveOrUpdateQuestion,
  deleteQuestion: deleteQuestion
}

function saveOrUpdateQuestion (req, res) {
  const data = req.body

  if (req.params.id) {
    QuestionType.where({name: data.question_type}).fetch()
      .then(questionType => {
        return Question.forge({id: data.question_id}).save({
          exam_id: data.exam_id,
          points: data.points,
          description: data.description,
          question_type_id: questionType.get('id')
        })
      })
      .then(question => {
        if (data.question_type === 'text_input') {
          QuestionTypeTextInput.forge({question_id: question.get('id')})
            .save({answer: data.answer})
        } else if (data.question_type === 'true_false') {
          QuestionTypeTrueFalse.forge({question_id: question.get('id')})
            .save({answer: data.answer})
        }
      })
      .then(() => res.redirect('/exams/' + data.exam_id))
  } else {
    QuestionType.where({name: data.question_type}).fetch()
      .then(questionType => {
        const newQuestion = Question.forge({
          exam_id: data.exam_id,
          points: data.points,
          description: data.description
        })
        return questionType.related('questions').create(newQuestion)
      })
      .then(question => {
        if (data.question_type === 'text_input') {
          QuestionTypeTextInput.forge({
            question_id: question.get('id'),
            answer: data.answer
          }).save(null, {method: 'insert'})
        } else if (data.question_type === 'true_false') {
          QuestionTypeTrueFalse.forge({
            question_id: question.get('id'),
            answer: data.answer
          }).save(null, {method: 'insert'})
        }
      })
      .then(() => res.redirect('/exams/' + data.exam_id))
  }
}

function deleteQuestion (req, res) {
  if (req.params.id) {
    Question.forge(req.params).destroy({require: true}).then(() => res.redirect('/exams/' + req.body.exam_id))
  }
}
