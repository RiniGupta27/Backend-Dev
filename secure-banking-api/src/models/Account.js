const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, 'Balance cannot be negative'],
    },
    accountType: {
      type: String,
      enum: ['savings', 'checking'],
      required: [true, 'Account type is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Account', accountSchema);
