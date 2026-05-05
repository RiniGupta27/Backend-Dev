const rateLimit = require('express-rate-limit');

// General API rate limiter — 100 req / 15 min per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});

// Stricter limiter for auth routes — 10 req / 15 min per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many auth attempts. Please try again after 15 minutes.',
  },
});

// Transaction limiter — 30 req / 15 min per IP
const transactionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many transaction requests. Please slow down.',
  },
});

module.exports = { generalLimiter, authLimiter, transactionLimiter };
