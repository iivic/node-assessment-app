const { User } = require('../models/user')

module.exports = {
  create: createUser,
  getAll: getAllUsers,
  getOne: getOneUser,
  update: updateUser,
  delete: deleteUser
}

function createUser (req, res) {
  User.forge(req.body).save()
    .then(result => res.json(result))
}

function getAllUsers (_, res) {
  User.fetchAll()
    .then(result => res.json(result))
}

function getOneUser (req, res) {
  User.where(req.params).fetch()
    .then(result => res.json(result))
}

function updateUser (req, res) {
  User.forge(req.params).save(req.body)
    .then(result => res.json(result))
}

function deleteUser (req, res) {
  User.forge(req.params).destroy({require: true})
    .then(result => res.json(result))
}
