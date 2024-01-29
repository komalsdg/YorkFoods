const bcrypt = require('bcrypt')

const prisma = require("../../prismaClient");
const tokenHelper = require("../../helpers/token");

module.exports.userLogin = async (req, res) => {
  try{

    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
      const updatedUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          authenticationToken: tokenHelper.createToken(email),
        },
      });
      res.json(updatedUser);
    } else {
      res.status(401).json({ error: "Invalid email/password" });
    }
  }catch(error){
    console.log('Error in session/login', error)
    res.status(500).send('Something went wrong')
  }
}