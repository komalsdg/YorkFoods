const bcrypt = require("bcrypt");

const prisma = require("../../prismaClient");
const tokenHelper = require("../../helpers/token");
const {
  restaurantRegistrationSchema,
} = require("../../validations/registrations");

module.exports.registerRestaurant = async (req, res) => {
  try {
    const { email, name, password, cuisineType, location, subdomain } =
      req.body;
    await restaurantRegistrationSchema.validate(req.body);
    const newRestaurant = await prisma.restaurant.create({
      data: {
        email,
        name,
        passwordHash: bcrypt.hashSync(password, 10),
        cuisineType,
        authenticationToken: tokenHelper.createToken(email),
        location,
        subdomain,
      },
    });
    res.json(newRestaurant);
  } catch (error) {
    console.log("Error in register", error.message);
    res.status(500).send({ error: error.message });
  }
};
