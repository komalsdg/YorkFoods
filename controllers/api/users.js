const prisma = require("../../prismaClient");

const getUsers = async (req, res) => {
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

const getUserProfile = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      name: true,
      email: true,
      cuisinePreference: true,
    },
  });
  res.json(user);
}

module.exports = {
  getUsers,
  getUserProfile
}