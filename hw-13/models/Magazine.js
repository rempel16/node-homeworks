const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issueNumber: { type: Number, required: true },
    publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Magazine', magazineSchema);
