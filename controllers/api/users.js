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


const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, cuisinePreference } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        cuisinePreference,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cuisinePreference: true,
      },
    });

    res.json(updatedUser);
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