
exports.up = function (knex, Promise) {
  return knex.schema.createTableIfNotExists('user', table => {
    table.increments('id').unsigned().primary()
    table.string('username').unique().notNull()
    table.string('password_digest').notNull()
    table.boolean('is_admin').defaultTo(0)
    table.boolean('is_professor').defaultTo(0)
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('user')
}
