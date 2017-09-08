
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('question_type', table => {
    table.increments('id').unsigned().primary()
    table.string('name')
  }).then(() => {
    return knex.schema.createTableIfNotExists('question', table => {
      table.increments('id').unsigned().primary()
      table.integer('exam_id').unsigned().references('id').inTable('exam').onDelete('CASCADE')
      table.integer('points').unsigned()
      table.string('description')
      table.integer('question_type_id').unsigned().references('id').inTable('question_type').onDelete('CASCADE')
    })
  }).then(() => {
    return knex.schema.createTableIfNotExists('question_type_text_input', table => {
      table.integer('question_id').unsigned().references('id').inTable('question').primary().onDelete('CASCADE')
      table.string('answer')
    })
  }).then(() => {
    return knex.schema.createTableIfNotExists('question_type_true_false', table => {
      table.integer('question_id').unsigned().references('id').inTable('question').primary().onDelete('CASCADE')
      table.boolean('answer')
    })
  }).then(() => {
    return knex.schema.createTableIfNotExists('question_type_multi_choice', table => {
      table.increments('id').unsigned().primary()
      table.integer('question_id').unsigned().references('id').inTable('question').onDelete('CASCADE')
      table.string('choice')
      table.boolean('is_correct')
    })
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('question_type_true_false')
    .then(() => knex.schema.dropTableIfExists('question_type_text_input'))
    .then(() => knex.schema.dropTableIfExists('question_type_multi_choice'))
    .then(() => knex.schema.dropTableIfExists('question'))
    .then(() => knex.schema.dropTableIfExists('question_type'))
}
