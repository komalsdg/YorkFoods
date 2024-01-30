const prisma = require("../../prismaClient");
const { restaurantSchema } = require("../../validations/restaurant");

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
    await restaurantSchema.validate(req.body);
    const { id } = req.params;
    const restaurant = prisma.restaurant.findUnique({where: {
        id: parseInt(id),
      }});
    const updateRestaurant = await prisma.restaurant.update({
      where: { id: id },
      select: {
      email: true,
      name: true,
      cuisineType: true,
      location: true,
      subdomain: true
    },
      data: {
        ...restaurant,
        body
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
    const archiveRestaurant = await prisma.restaurant.update({
      where: { id: parsetInt(id) },
      select: {
        deletedAt: true
      },
      data: {
        deletedAt: new Date()
      },
    });
    res.send(archiveRestaurant);
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