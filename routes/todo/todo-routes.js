var express = require('express');
var router = express.Router();
var todoController = require('./controllers/todoController');

router
  .route('/')
  .get(todoController.getTodos)
  .post(todoController.addTodo)
  .put(todoController.updateTodo);

router
  .route('/:id')
  .get(todoController.getTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
