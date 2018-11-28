var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  fullName: String,
  todoText: String
});

module.exports = mongoose.model('Todo', todoSchema);
