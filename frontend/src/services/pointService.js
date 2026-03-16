const User = require("../models/User");

function calculateLevel(points) {
  return Math.floor(points / 100) + 1;
}

async function awardPoints(userId, points) {
  const user = await User.findById(userId);

  user.total_points += points;
  user.level = calculateLevel(user.total_points);

  await user.save();

  return {
    total_points: user.total_points,
    level: user.level
  };
}

module.exports = { awardPoints };
