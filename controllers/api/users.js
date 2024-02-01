const prisma = require("../../prismaClient");

const { userUpdateSchema } = require("../../validations/users");

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
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.entity.id),
    },
    select: {
      id: true,
      name: true,
      email: true,
      cuisinePreference: true,
      dieticianData: true,
    },
  });
  res.json(user);
};

const updateUserProfile = async (req, res) => {
  try {
    const body = req.body;
    await userUpdateSchema.validate(body, { stripUnknown: false });
    const { id, ...userData } = req.entity;
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        ...userData,
        ...body,
      },
    });
    res.send(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  getUserProfile,
  updateUserProfile,
};
