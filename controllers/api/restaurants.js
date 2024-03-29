const prisma = require("../../prismaClient");
const { restaurantUpdateSchema } = require("../../validations/restaurant");

//list restaurants which are active
const getRestaurants = async (req, res) => {
  try {
    const allRestaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        subdomain: true,
        cuisineType: true,
        location: true,
        subdomain: true,
      },
      /*where: {
        //isVerified: true,
        isBlocked: false, //note: for admin - make ternary with isblocked -true
      },*/
    });
    res.json(allRestaurants);
  } catch (error) {
    console.log("Error in getRestaurants", error.message);
    res.status(500).send({ error: error.message });
  }
};

//get restaurant profile
const getRestaurantProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await prisma.restaurant.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        subdomain: true,
        cuisineType: true,
        location: true,
        subdomain: true, // only for admin, restaurants
      },
      where: {
        id: parseInt(id),
      },
    });
    res.json(restaurant);
  } catch (error) {
    console.log("Error in getRestaurantProfile", error.message);
    res.status(500).send({ error: error.message });
  }
};

//update restaurant profile by restaurant,admin
const updateRestaurantProfile = async (req, res) => {
  const body = req.body;
  try {
    await restaurantUpdateSchema.validate(req.body, { stripUnknown: false });

    const { id, ...restaurantData } = req.entity;

    const updateRestaurant = await prisma.restaurant.update({
      where: { id: id },
      data: {
        ...restaurantData,
        ...body,
      },
    });
    res.send(updateRestaurant);
  } catch (error) {
    console.log("Error in updateRestaurantProfile", error.message);
    res.status(500).send({ error: error.message });
  }
};

//delete restaurant by restaurant,admin
const archiveRestaurant = async (req, res) => {
    try {
      const { id } = req.params;
      const archivedRestaurant = await prisma.restaurant.update({
        where: { id: parseInt(id) },
        data: {
          deletedAt: new Date(),
        }
      });
      res.send(archivedRestaurant);
    } catch (error) {
      console.log("Error in archiveRestaurant", error.message);
      res.status(500).send({ error: error.message });
    }
  };
  

module.exports = {
  getRestaurants,
  getRestaurantProfile,
  updateRestaurantProfile,
  archiveRestaurant,
};
