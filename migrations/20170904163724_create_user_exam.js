
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('user_exam', table => {
    table.increments('id').unsigned().primary()
    table.integer('user_id').unsigned().references('id').inTable('user')
    table.integer('exam_id').unsigned().references('id').inTable('exam')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('user_exam')
}
