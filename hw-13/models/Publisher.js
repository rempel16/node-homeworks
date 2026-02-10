const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Publisher', publisherSchema);
