const express = require('express');
const router = express.Router();

const {
  createAccount,
  getMyAccounts,
  getAllAccounts,
  getAccountById,
} = require('../controllers/accountController');
const { protect } = require('../middlewares/auth');
const { roleGuard } = require('../middlewares/roleGuard');
const { validate } = require('../middlewares/validate');
const { createAccountSchema } = require('../validators/txValidators');

// All account routes require authentication
router.use(protect);

router.post('/', validate(createAccountSchema), createAccount);
router.get('/me', getMyAccounts);
router.get('/all', roleGuard('admin'), getAllAccounts);   // Admin only
router.get('/:id', getAccountById);

module.exports = router;
