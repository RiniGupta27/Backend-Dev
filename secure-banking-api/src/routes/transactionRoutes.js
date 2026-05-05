const express = require('express');
const router = express.Router();

const { deposit, withdraw, transfer, getHistory } = require('../controllers/transactionController');
const { protect } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const { transactionLimiter } = require('../middlewares/rateLimiter');
const { depositSchema, withdrawSchema, transferSchema } = require('../validators/txValidators');

// All transaction routes require authentication + transaction rate limiter
router.use(protect, transactionLimiter);

router.post('/deposit', validate(depositSchema), deposit);
router.post('/withdraw', validate(withdrawSchema), withdraw);
router.post('/transfer', validate(transferSchema), transfer);
router.get('/history/:accountId', getHistory);

module.exports = router;
