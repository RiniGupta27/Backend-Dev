const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const { checkBalance } = require('../utils/checkBalance');

// ─── Helper: verify account ownership ──────────────────────────────────────
const verifyOwnership = (account, userId) => {
  if (account.userId.toString() !== userId.toString()) {
    const err = new Error('You do not own this account.');
    err.statusCode = 403;
    throw err;
  }
};

// ─── Deposit ───────────────────────────────────────────────────────────────
const deposit = async (req, res) => {
  try {
    const { accountId, amount, description } = req.body;

    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    verifyOwnership(account, req.user._id);

    // Credit the account
    account.balance = parseFloat((account.balance + amount).toFixed(2));
    await account.save();

    // Record transaction
    const transaction = await Transaction.create({
      toAccount: accountId,
      amount,
      type: 'deposit',
      description,
    });

    return res.status(200).json({
      success: true,
      message: `Successfully deposited $${amount.toFixed(2)}.`,
      data: { newBalance: account.balance, transaction },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

// ─── Withdraw ──────────────────────────────────────────────────────────────
const withdraw = async (req, res) => {
  try {
    const { accountId, amount, description } = req.body;

    // checkBalance(accountId, amount) — Core pre-transaction guard
    const account = await checkBalance(accountId, amount);

    verifyOwnership(account, req.user._id);

    // Debit the account
    account.balance = parseFloat((account.balance - amount).toFixed(2));
    await account.save();

    // Record transaction
    const transaction = await Transaction.create({
      fromAccount: accountId,
      amount,
      type: 'withdrawal',
      description,
    });

    return res.status(200).json({
      success: true,
      message: `Successfully withdrew $${amount.toFixed(2)}.`,
      data: { newBalance: account.balance, transaction },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

// ─── Transfer ──────────────────────────────────────────────────────────────
const transfer = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount, description } = req.body;

    if (fromAccountId === toAccountId) {
      return res.status(400).json({
        success: false,
        message: 'Source and destination accounts must be different.',
      });
    }

    // checkBalance — Core pre-transaction guard for sender
    const fromAccount = await checkBalance(fromAccountId, amount);

    verifyOwnership(fromAccount, req.user._id);

    // Verify destination account exists
    const toAccount = await Account.findById(toAccountId);
    if (!toAccount) {
      return res.status(404).json({ success: false, message: 'Destination account not found.' });
    }

    // Debit sender / Credit receiver
    fromAccount.balance = parseFloat((fromAccount.balance - amount).toFixed(2));
    toAccount.balance = parseFloat((toAccount.balance + amount).toFixed(2));

    await fromAccount.save();
    await toAccount.save();

    // Single transaction record linking both accounts
    const transaction = await Transaction.create({
      fromAccount: fromAccountId,
      toAccount: toAccountId,
      amount,
      type: 'transfer',
      description,
    });

    return res.status(200).json({
      success: true,
      message: `Successfully transferred $${amount.toFixed(2)}.`,
      data: {
        fromAccountBalance: fromAccount.balance,
        toAccountBalance: toAccount.balance,
        transaction,
      },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
};

// ─── Transaction History ───────────────────────────────────────────────────
const getHistory = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { page = 1, limit = 20, type } = req.query;

    // Verify account exists and user owns it (or is admin)
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    if (req.user.role !== 'admin' && account.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    // Build query: all transactions involving this account
    const query = {
      $or: [{ fromAccount: accountId }, { toAccount: accountId }],
    };

    if (type && ['deposit', 'withdrawal', 'transfer'].includes(type)) {
      query.type = type;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('fromAccount', 'accountType')
      .populate('toAccount', 'accountType');

    return res.status(200).json({
      success: true,
      data: {
        account: { id: account._id, type: account.accountType, balance: account.balance },
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit)),
        },
        transactions,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { deposit, withdraw, transfer, getHistory };
