const bcrypt = require("bcrypt");
const yup = require("yup");

const prisma = require("../../prismaClient");
const tokenHelper = require("../../helpers/token");
const { userRegistrationSchema } = require("../../validations/registrations");

module.exports.registerUser = async (req, res) => {
  try {
    const { email, name, password, cuisinePreference } = req.body;
    await userRegistrationSchema.validate(req.body);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: bcrypt.hashSync(password, 10),
        cuisinePreference,
        authenticationToken: tokenHelper.createToken(email),
        wallet: {
          create: {
            balance: 500,
          },
        },
      }
    });
    res.json(newUser);
  } catch (error) {
    console.log("Error in register", error.message);
    res.status(500).send({ error: error.message });
  }
};