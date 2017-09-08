const dbConfig = require('../../knexfile.js')[process.env.NODE_ENV]
const knex = require('knex')(dbConfig)
const bookshelf = require('bookshelf')(knex)

module.exports = {
  dbConfig: dbConfig,
  knex: knex,
  bookshelf: bookshelf
}
