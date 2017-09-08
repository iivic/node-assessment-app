const app = require('express')()
const bodyParser = require('body-parser')
const { dbConfig } = require('./exams_app/models/db')
const path = require('path')
const port = dbConfig.port
const passport = require('passport')
const { Strategy } = require('passport-local')
const { User } = require('./exams_app/models/user')
const Routes = require('./exams_app/routes/main')
const UserApiRoutes = require('./exams_app/routes/user_api')
const staticFiles = require('express').static
const { requiresAdmin, requiresProfessor } = require('./exams_app/routes/utils/user_privileges')

// passport config
// getting attributes from models is done with .get in this case
// we just send the attributes so the template can get the value
passport.use('login', new Strategy(
  (username, password, done) => {
    User.where({username})
      .fetch()
      .then(user => {
        if (!user) return done(null, false)
        user.authenticate(password)
          .then(user => done(null, user.attributes))
          .catch(_ => done(null, false))
      })
      .catch(err => done(err))
  }
))
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  User.where({id})
    .fetch()
    .then(user => done(null, user.attributes))
    .catch(err => done(err))
})

app.set('view engine', 'pug')
  .set('views', path.join(__dirname, 'exams_app/views'))
  .use(staticFiles('./exams_app/public/'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(require('express-session')({
    secret: 'some-secret',
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.locals.user = req.user
    next()
  })
  .all('/users*', requiresAdmin())
  .all('/exams*', requiresProfessor())
  .all('/questions*', requiresProfessor())
  .use('/', Routes)
  .use('/api/v1', UserApiRoutes)

app.listen(port, function appListener (err) {
  if (err) console.error('Error: Starting server failed,', err.message)
  console.log('Listening on port ' + port)
})
