var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: { type: String, default: 'Default Name' },
  password: { type: String, default: '' },
  email: { type: String, default: '' },
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
