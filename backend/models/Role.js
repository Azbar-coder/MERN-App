const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: [String],  // Array of permissions as strings
});

module.exports = mongoose.model('Role', RoleSchema);
