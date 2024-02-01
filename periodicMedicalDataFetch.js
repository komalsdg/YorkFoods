const cron = require("node-cron");
const axios = require("axios");
const prisma = require("./prismaClient");

const MEDICAL_DATA_PROVIDER_URL = "http://localhost:4000/medical-data";

const fetchMedicalData = async (email) => {
  const response = await axios.get(
    `${MEDICAL_DATA_PROVIDER_URL}?email=${email}`
  );

  return response.data;
};

async function main() {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
      },
    });

    for (const user of users) {
      const dieticianData = await fetchMedicalData(user.email);
      if (dieticianData) {
        await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            dieticianData,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error updating medical data:", error);
  }
}

cron.schedule("* * * * *", () => {
  main();
});