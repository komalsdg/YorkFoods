const bcrypt = require("bcrypt");

const prisma = require("../../prismaClient");
const {
  userUpdateSchema,
  passwordUpdateSchema,
} = require("../../validations/users");
const tokenHelper = require("../../helpers/token");

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
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken: tokenHelper.createToken(email),
      },
    });

    console.log("Reset password token:", updatedUser.resetPasswordToken);
    res.send({
      message: "Password reset email sent",
      resetPasswordToken: updatedUser.resetPasswordToken,
    });
  } catch (error) {
    console.error("Error sending reset password mail", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { token, newPassword, email } = req.body;

    await passwordUpdateSchema.validate(req.body, { stripUnknown: false });

    const user = await prisma.user.findUnique({
      where: {
        email,
        resetPasswordToken: token,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found, invalid token" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash: hashedPassword,
        resetPasswordToken: null,
      },
    });

    res.send({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserProfile,
  updateUserProfile,
  resetPassword,
  updatePassword,
};