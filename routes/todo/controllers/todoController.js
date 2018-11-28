var Todo = require('../models/todoModel');
var mongoose = require('mongoose');

module.exports = {
  getTodos: (req, res) => {
    Todo.find().exec((err, todos) => {
      if (err) {
        return res.json({
          confirmation: 'failure',
          message: 'Failed to find Todo list',
          error: err
        });
      }

      return res.json({
        confirmation: 'success',
        message: 'Fetched Successfully',
        todos
      });
    });
  },
  addTodo: (req, res) => {
    const newTodo = new Todo(req.body);
    newTodo.save((err, todo) => {
      if (err) {
        return res.json({
          confirmation: 'failure',
          message: 'Failed to save new Todo',
          error: err
        });
      }
      return res.json({
        confirmation: 'success',
        message: 'Saved new todo',
        todo
      });
    });
  },
  updateTodo: (req, res) => {
    Todo.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true },
      (err, todo) => {
        if (err) {
          return res.json({
            confirmation: 'Failure',
            message: 'Failed to update Todo',
            error: err
          });
        }
        console.log('Update Todo: ', todo);
        return res.json({
          confirmation: 'Success',
          message: 'Updatd Todo',
          todo
        });
      }
    );
  },
  getTodo: (req, res) => {
    Todo.find({ _id: req.params.id }).exect((err, todo) => {
      if (err) {
        return res.json({
          confirmation: 'Failure',
          message: 'Failed to get Todo',
          error: err
        });
      }
      if (todo.length) {
        return res.json({
          confirmation: 'Success',
          message: 'Todo fetched successfully',
          todo
        });
      } else {
        return res.json({
          confirmation: 'Failure',
          message: 'Todo not found with given _id'
        });
      }
    });
  },
  deleteTodo: (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
      if (err) {
        return res.json({
          confirmation: 'Failure',
          message: 'Failed to delete todo',
          error: err
        });
      }
      return res.json({
        confirmation: 'Success',
        message: `Deleted ${todo.todoText} Successfully`
      });
    });
  }
};
