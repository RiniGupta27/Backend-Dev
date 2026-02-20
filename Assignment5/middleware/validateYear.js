function validateYear(req, res, next) {
  const { year } = req.body;

  if (!year || isNaN(year)) {
    return res.status(400).json({
      message: "Year must be a valid number"
    });
  }

  if (year < 1900 || year > new Date().getFullYear()) {
    return res.status(400).json({
      message: "Year is out of valid range"
    });
  }

  next();
}

module.exports = validateYear;
