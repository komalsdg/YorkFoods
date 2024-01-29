const bcrypt = require('bcrypt')

const prisma = require("../../prismaClient");
const tokenHelper = require("../../helpers/token");

module.exports.entityLogin = async (req, res) => {
  try {
    const { email, password, type } = req.body; //Pass either "user" or "restaurant"
    let entity;

    if (type === 'user') {
      entity = await prisma.user.findUnique({ where: { email } });
    } else if (type === 'restaurant') {
      entity = await prisma.restaurant.findUnique({ where: { email } });
    } else {
      return res.status(400).json({ error: "Invalid type specified" });
    }

    if (entity && bcrypt.compareSync(password, entity.passwordHash)) {
      const updatedEntity = await prisma[type].update({
        where: {
          email,
        },
        data: {
          authenticationToken: tokenHelper.createToken(email),
        },
      });
      res.json(updatedEntity);
    } else {
      res.status(401).json({ error: "Invalid email/password" });
    }
  } catch (error) {
    console.log('Error in entity/login', error);
    res.status(500).send('Something went wrong');
  }
}