const { bookshelf } = require('./db')
const { User } = require('./user')
const { Question } = require('./question')

const Exam = bookshelf.Model.extend({
  tableName: 'exam',
  hasTimestamps: true,
  users: function () {
    return this.belongsToMany(User)
  },
  questions: function () {
    return this.hasMany(Question)
  }
})

module.exports = {
  Exam
}
