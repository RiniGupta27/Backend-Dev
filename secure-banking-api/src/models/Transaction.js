const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      default: null,
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      default: null,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be positive'],
    },
    type: {
      type: String,
      enum: ['deposit', 'withdrawal', 'transfer'],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for fast history queries
transactionSchema.index({ fromAccount: 1, date: -1 });
transactionSchema.index({ toAccount: 1, date: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
