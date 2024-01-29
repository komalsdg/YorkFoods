const prisma = require("../../prismaClient");

module.exports.getUsers = async (req, res) => {
  const allUsers = await prisma.user.findMany()
  res.json(allUsers);
};
