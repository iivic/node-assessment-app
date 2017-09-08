
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('user_answer', table => {
    table.increments('id').unsigned().primary()
    table.integer('user_id').unsigned().references('id').inTable('user')
    table.integer('question_id').unsigned().references('id').inTable('question')
    table.string('text')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('user_answer')
}
