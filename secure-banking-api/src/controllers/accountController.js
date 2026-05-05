const Account = require('../models/Account');

// ─── Create Account ────────────────────────────────────────────────────────
const createAccount = async (req, res) => {
  try {
    const { accountType } = req.body;

    const account = await Account.create({
      userId: req.user._id,
      accountType,
      balance: 0,
    });

    return res.status(201).json({
      success: true,
      message: `${accountType.charAt(0).toUpperCase() + accountType.slice(1)} account created successfully.`,
      data: { account },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get My Accounts ───────────────────────────────────────────────────────
const getMyAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: accounts.length,
      data: { accounts },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get All Accounts (Admin Only) ─────────────────────────────────────────
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find()
      .populate('userId', 'name email role createdAt')
      .sort({ createdAt: -1 });

    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    return res.status(200).json({
      success: true,
      count: accounts.length,
      totalBalance: parseFloat(totalBalance.toFixed(2)),
      data: { accounts },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Single Account ────────────────────────────────────────────────────
const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found.' });
    }

    // Non-admins can only view their own accounts
    if (req.user.role !== 'admin' && account.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    return res.status(200).json({ success: true, data: { account } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createAccount, getMyAccounts, getAllAccounts, getAccountById };
