const Trophy = require("../models/Trophy");
const UserTrophy = require("../models/UserTrophy");
const Entry = require("../models/Entry");

async function checkAndAwardTrophies(userId) {
  // 1. Obtener todas las definiciones de trofeos
  const trophies = await Trophy.find();

  // 2. Contar entradas por categoría
  const counts = await Entry.aggregate([
    { $match: { user: userId } },
    { $group: { _id: "$category", total: { $sum: 1 } } }
  ]);

  const categoryCount = {};
  counts.forEach(c => {
    categoryCount[c._id] = c.total;
  });

  const newTrophies = [];

  // 3. Comparar requisitos
  for (const trophy of trophies) {
    const progress = categoryCount[trophy.category] || 0;

    if (progress >= trophy.requirement) {
      const exists = await UserTrophy.findOne({
        user: userId,
        trophy: trophy._id
      });

      if (!exists) {
        const earned = await UserTrophy.create({
          user: userId,
          trophy: trophy._id,
          earnedAt: new Date()
        });

        newTrophies.push(earned);
      }
    }
  }

  return newTrophies;
}

module.exports = { checkAndAwardTrophies };
