var mongoose = require('mongoose');

var BathroomSchema = new mongoose.Schema({
  place_id: { type: String, default: '' },
  name: { type: String, default: 'Default Name' },
  address: { type: String, default: '' },
  lat: { type: Number, default: 0 },
  lng: { type: Number, default: 0 },
  code: { type: String, default: '1111' },
  isPublic: { type: Boolean, default: false },
  quality: { type: Number, default: 5 },
  isValidated: { type: Boolean, default: false }
});

module.exports = mongoose.model('Bathroom', BathroomSchema);
