const bcrypt = require('bcrypt')

const prisma = require("../../prismaClient");
const tokenHelper = require("../../helpers/token");

module.exports.registerUser = async (req, res) => {
  const { email, name, password, cuisinePreference } = req.body;
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash: bcrypt.hashSync(password, 10),
      cuisinePreference,
      authenticationToken: tokenHelper.createToken(email)
    },
  });
  res.json(newUser);
}