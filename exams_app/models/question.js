const { bookshelf } = require('./db')
const { User } = require('./user')
const { Exam } = require('./exam')

const Question = bookshelf.Model.extend({
  tableName: 'question',
  exam: function () {
    return this.belongsTo(Exam)
  },
  users: function () {
    return this.belongsToMany(User)
  },
  questionType: function () {
    return this.belongsTo(QuestionType)
  },
  questionTypeMultiChoice: function () {
    return this.hasMany(QuestionTypeMultiChoice)
  },
  questionTypeTextInput: function () {
    return this.hasOne(QuestionTypeTextInput)
  },
  questionTypeTrueFalse: function () {
    return this.hasOne(QuestionTypeTrueFalse)
  }
})

const QuestionType = bookshelf.Model.extend({
  tableName: 'question_type',
  questions: function () {
    return this.hasMany(Question)
  }
})

const QuestionTypeMultiChoice = bookshelf.Model.extend({
  tableName: 'question_type_multi_choice',
  question: function () {
    return this.belongsTo(Question)
  }
})

const QuestionTypeTextInput = bookshelf.Model.extend({
  tableName: 'question_type_text_input',
  idAttribute: 'question_id',
  question: function () {
    return this.belongsTo(Question)
  }
})

const QuestionTypeTrueFalse = bookshelf.Model.extend({
  tableName: 'question_type_true_false',
  idAttribute: 'question_id',
  question: function () {
    return this.belongsTo(Question)
  }
})

module.exports = {
  Question: Question,
  QuestionType: QuestionType,
  QuestionTypeMultiChoice: QuestionTypeMultiChoice,
  QuestionTypeTextInput: QuestionTypeTextInput,
  QuestionTypeTrueFalse: QuestionTypeTrueFalse
}
