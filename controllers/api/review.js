const prisma = require("../../prismaClient");
const {
    reviewSchema,
} = require("../../validations/review");

//insert review
const addReview = async (req, res) => {
  try {
    const {
      reviewableId,
      reviewableType,
      rating,
      comment,
    } = req.body;
    await reviewSchema.validate(req.body, { stripUnknown: false });
    const newReview = await prisma.review.create({
      data: {
        userId: req.entity.id,
        reviewableId,
        reviewableType,
        rating,
        comment,
      },
    });
    res.json(newReview);
  } catch (error) {
    console.log("Error in addingReview", error.message);
    res.status(500).send({ error: error.message });
  }
};


//list Restaurant's review
const getRestaurantReview = async (req, res) => {
    try {
      const restaurantId = req.params.id;
      const restaurantReviews = await prisma.review.findMany({
        select: {
            reviewableId: true,
            reviewableType: true,
            rating: true,
            comment: true,
        },
        where: {
            reviewableId: parseInt(restaurantId),
            reviewableType: "RESTAURANT"
        },
      });
      res.json(restaurantReviews);
    } catch (error) {
      console.log("Error in getRestaurantReview", error.message);
      res.status(500).send({ error: error.message });
    }
  };

//list User's review
const getMenuItemReview = async (req, res) => {
    try {
      const menuItemId = req.params.id;
      const menuItemReview = await prisma.review.findMany({
        select: {
            reviewableId: true,
            reviewableType: true,
            rating: true,
            comment: true,
        },
        where: {
            reviewableId: parseInt(menuItemId),
            reviewableType: "MENUITEM"
        },
      });
      res.json(menuItemReview);
    } catch (error) {
      console.log("Error in getMenuItemReview", error.message);
      res.status(500).send({ error: error.message });
    }
  };
  

module.exports = {
    addReview,
    getRestaurantReview,
    getMenuItemReview,
};

