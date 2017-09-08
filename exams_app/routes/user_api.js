const { Router } = require('express')
const UserAPIController = require('../controllers/user_api_controller')
const { apiRequiresAdmin, apiRequiresProfessor } = require('./utils/user_privileges')

/*
 *  GET http://localhost:8000/api/v1/users
 *  POST http://localhost:8000/api/v1/users
 *  GET http://localhost:8000/api/v1/users/:user_id
 *  PATCH http://localhost:8000/api/v1/users/:user_id
 *  DELETE http://localhost:8000/api/v1/users/:user_id
 */

module.exports = Router()
  .get('/users', apiRequiresProfessor(), UserAPIController.getAll)
  .post('/users', apiRequiresAdmin(), UserAPIController.create)
  .get('/users/:id', apiRequiresProfessor(), UserAPIController.getOne)
  .patch('/users/:id', apiRequiresAdmin(), UserAPIController.update)
  .delete('/users/:id', apiRequiresAdmin(), UserAPIController.delete)
