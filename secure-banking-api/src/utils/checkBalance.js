const Account = require('../models/Account');

/**
 * checkBalance — Core pre-transaction guard.
 *
 * Fetches the current balance for an account and verifies it is sufficient
 * to cover the requested amount. Must be called before every debit operation.
 *
 * @param {string} accountId - The account to check
 * @param {number} amount    - The amount that will be debited
 * @returns {Promise<object>} - The account document if balance is sufficient
 * @throws {Error}           - 404 if account not found, 400 if insufficient funds
 */
const checkBalance = async (accountId, amount) => {
  const account = await Account.findById(accountId);

  if (!account) {
    const err = new Error('Account not found.');
    err.statusCode = 404;
    throw err;
  }

  if (account.balance < amount) {
    const err = new Error(
      `Insufficient funds. Current balance: $${account.balance.toFixed(2)}, ` +
        `requested: $${amount.toFixed(2)}.`
    );
    err.statusCode = 400;
    throw err;
  }

  return account;
};

module.exports = { checkBalance };
