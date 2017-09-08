const securePassword = require('bookshelf-secure-password')
const { bookshelf } = require('./db')
const { Exam } = require('./exam')
const { Question } = require('./question')

bookshelf.plugin(securePassword)

const User = bookshelf.Model.extend({
  tableName: 'user',
  hasTimestamps: true,
  hasSecurePassword: true,
  exams: function () {
    return this.belongsToMany(Exam, 'user_exam')
  },
  questions: function () {
    return this.belongsToMany(Question, 'user_answer')
  }
})

const UserAnswer = bookshelf.Model.extend({
  tableName: 'user_answer',
  user: function () {
    return this.belongsTo(User)
  },
  question: function () {
    return this.belongsTo(Question)
  }
})

const UserExam = bookshelf.Model.extend({
  tableName: 'user_exam',
  user: function () {
    return this.belongsTo(User)
  },
  exam: function () {
    return this.belongsTo(Exam)
  }
})

module.exports = {
  User: User,
  UserAnswer: UserAnswer,
  UserExam: UserExam
}
