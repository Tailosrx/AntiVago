const Trophy = require("../models/Trophy");
const UserTrophy = require("../models/UserTrophy");
const Entry = require("../models/Entry");

exports.getTrophyDefinitions = async (req, res) => {
  const trophies = await Trophy.find();
  res.json(trophies);
};

exports.getMyTrophies = async (req, res) => {
  const userId = req.user.id;

  const myTrophies = await UserTrophy.find({ user: userId })
    .populate("trophy");

  res.json(myTrophies);
};

exports.getTrophyProgress = async (req, res) => {
  const userId = req.user.id;

  const entries = await Entry.aggregate([
    { $match: { user: userId } },
    { $group: { _id: "$category", total: { $sum: 1 } } }
  ]);

  res.json(entries);
};
