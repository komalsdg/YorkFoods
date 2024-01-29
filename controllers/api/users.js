const prisma = require("../../prismaClient");

module.exports.getUsers = async (req, res) => {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      cuisinePreference: true,
    },
  });
  res.json(allUsers);
};
