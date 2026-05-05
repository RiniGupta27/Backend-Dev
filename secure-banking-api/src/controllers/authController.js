const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateTokens');

// ─── Register ──────────────────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for duplicate email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    // Auto-promote to admin if email matches ADMIN_EMAIL env var
    const role = email === process.env.ADMIN_EMAIL ? 'admin' : 'user';

    // Create user (pre-save hook will hash the password)
    const user = await User.create({ name, email, passwordHash: password, role });

    // Generate tokens right away so user is logged in on registration
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    // Persist refresh token (select: false normally, so use findByIdAndUpdate)
    await User.findByIdAndUpdate(user._id, { refreshToken });

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Login ─────────────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve user WITH passwordHash (normally excluded)
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Generate and store new tokens
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);
    await User.findByIdAndUpdate(user._id, { refreshToken });

    // Strip sensitive fields
    const safeUser = user.toJSON();

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: { user: safeUser, accessToken, refreshToken },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Refresh Token ─────────────────────────────────────────────────────────
const refreshToken = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    // Verify the refresh token signature
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token.',
      });
    }

    // Find user and check stored token matches (rotation guard)
    const user = await User.findById(decoded.id).select('+refreshToken');
    if (!user || user.refreshToken !== token) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token has been revoked or already rotated.',
      });
    }

    // Issue new pair and rotate
    const newAccessToken = generateAccessToken(user._id, user.role);
    const newRefreshToken = generateRefreshToken(user._id);
    await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken });

    return res.status(200).json({
      success: true,
      message: 'Tokens refreshed.',
      data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Logout ────────────────────────────────────────────────────────────────
const logout = async (req, res) => {
  try {
    // Invalidate the stored refresh token
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Current User ──────────────────────────────────────────────────────
const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: { user: req.user },
  });
};

// ─── Promote User to Admin (Admin only) ────────────────────────────────────
const promoteToAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({ success: false, message: 'Email is required.' });
    }

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { role: 'admin' },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.status(200).json({
      success: true,
      message: `${user.email} has been promoted to admin.`,
      data: { user },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, refreshToken, logout, getMe, promoteToAdmin };
