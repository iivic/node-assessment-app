
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('exam', table => {
    table.increments('id').unsigned().primary()
    table.string('title').unique()
    table.dateTime('start_datetime')
    table.dateTime('end_datetime')
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('exam')
}
