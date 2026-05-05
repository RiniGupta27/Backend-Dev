const Joi = require('joi');

const createAccountSchema = Joi.object({
  accountType: Joi.string().valid('savings', 'checking').required().messages({
    'any.only': "Account type must be 'savings' or 'checking'.",
    'any.required': 'Account type is required.',
  }),
});

const depositSchema = Joi.object({
  accountId: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid account ID format.',
      'any.required': 'Account ID is required.',
    }),
  amount: Joi.number().positive().precision(2).max(1_000_000).required().messages({
    'number.positive': 'Amount must be a positive number.',
    'number.max': 'Single deposit cannot exceed $1,000,000.',
    'any.required': 'Amount is required.',
  }),
  description: Joi.string().max(200).optional(),
});

const withdrawSchema = Joi.object({
  accountId: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid account ID format.',
      'any.required': 'Account ID is required.',
    }),
  amount: Joi.number().positive().precision(2).max(1_000_000).required().messages({
    'number.positive': 'Amount must be a positive number.',
    'number.max': 'Single withdrawal cannot exceed $1,000,000.',
    'any.required': 'Amount is required.',
  }),
  description: Joi.string().max(200).optional(),
});

const transferSchema = Joi.object({
  fromAccountId: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid source account ID format.',
      'any.required': 'Source account ID is required.',
    }),
  toAccountId: Joi.string()
    .pattern(/^[a-fA-F0-9]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid destination account ID format.',
      'any.required': 'Destination account ID is required.',
    }),
  amount: Joi.number().positive().precision(2).max(1_000_000).required().messages({
    'number.positive': 'Amount must be a positive number.',
    'number.max': 'Single transfer cannot exceed $1,000,000.',
    'any.required': 'Amount is required.',
  }),
  description: Joi.string().max(200).optional(),
});

module.exports = { createAccountSchema, depositSchema, withdrawSchema, transferSchema };
