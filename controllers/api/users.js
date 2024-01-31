const axios = require("axios");

const prisma = require("../../prismaClient");

const MEDICAL_DATA_PROVIDER_URL = "http://localhost:4000/medical-data";

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

const fetchMedicalData = async (req, res) => {
  try {
    const email = req.entity.email;

    const response = await axios.get(
      `${MEDICAL_DATA_PROVIDER_URL}?email=${email}`
    );

    if (response.data) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { dieticianData: response.data },
      });

      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Nutritional data not found" });
    }
  } catch (error) {
    console.error("Error updating dietician data:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getUsers,
  fetchMedicalData
};
