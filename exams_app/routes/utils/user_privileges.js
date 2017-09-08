const { ensureLoggedIn } = require('connect-ensure-login')

module.exports = {
  apiRequiresAdmin: apiRequiresAdmin,
  apiRequiresProfessor: apiRequiresProfessor,
  requiresAdmin: requiresAdmin,
  requiresProfessor: requiresProfessor
}

function apiRequiresAdmin () {
  return [
    function (req, res, next) {
      if (req.user && req.user.is_admin) { next() } else { res.status(401).send('Unauthorized') }
    }
  ]
}

function apiRequiresProfessor () {
  return [
    function (req, res, next) {
      if (req.user && (req.user.is_admin || req.user.is_professor)) { next() } else { res.status(401).send('Unauthorized') }
    }
  ]
}

function requiresAdmin () {
  return [
    ensureLoggedIn('/login'),
    function (req, res, next) {
      if (req.user && req.user.is_admin) { next() } else { res.status(401).send('Unauthorized') }
    }
  ]
}

function requiresProfessor () {
  return [
    ensureLoggedIn('/login'),
    function (req, res, next) {
      if (req.user && (req.user.is_admin || req.user.is_professor)) { next() } else { res.status(401).send('Unauthorized') }
    }
  ]
}
