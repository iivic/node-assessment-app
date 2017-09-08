const { User } = require('../models/user')

module.exports = {
  displayUsersDashboard: displayUsersDashboard,
  displayUsersForm: displayUsersForm,
  saveOrUpdateUser: saveOrUpdateUser,
  deleteUser: deleteUser
}

function displayUsersDashboard (_, res) {
  User.fetchAll().then(users => {
    res.render('users_admin/dashboard', {
      users: users.models
    })
  })
}

function displayUsersForm (req, res) {
  if (req.params.id) {
    User.where(req.params).fetch()
      .then(user => res.render('users_admin/create_update', {
        tUser: user.attributes
      }))
  } else res.render('users_admin/create_update')
}

function saveOrUpdateUser (req, res) {
  if (req.params.id) {
    User.forge(req.params).save(req.body).then(() => res.redirect('/users'))
  } else { User.forge(req.body).save().then(() => res.redirect('/users')) }
}

function deleteUser (req, res) {
  User.forge(req.params).destroy({require: true}).then(() => res.redirect('/users'))
}
