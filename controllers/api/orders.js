const prisma = require("../../prismaClient");

const { orderSchema, orderUpdateSchema } = require("../../validations/orders");

//list a user's order
const getUserOrders = async (req, res) => {
  try {
    const user = req.entity;
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        userId: true,
        restaurantId: true,
        totalPrice: true,
        status: true,
        OrderItems: true,
      },
      where: {
        userId: user.id,
      },
    });
    res.json(orders);
  } catch (error) {
    console.log("Error in getUserOrders", error.message);
    res.status(500).send({ error: error.message });
  }
};

//list orders per restaurants
const getRestaurantsOrders = async (req, res) => {
  try {
    const restaurant = req.entity;
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        userId: true,
        restaurantId: true,
        totalPrice: true,
        status: true,
        OrderItems: true,
      },
      where: {
        restaurantId: restaurant.id,
      },
    });
    res.json(orders);
  } catch (error) {
    console.log("Error in getRestaurantsOrders", error.message);
    res.status(500).send({ error: error.message });
  }
};

//insert order
const insertOrder = async (req, res) => {
  try {
    await orderSchema.validate(req.body, { stripUnknown: true });

    const { restaurantId, menuItemIds } = req.body;

    // Fetch menu items to validate they belong to the same restaurant
    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: {
          in: menuItemIds.map((item) => item.menuItemId),
        },
      },
    });

    // Check if all menu items belong to the specified restaurant and if the count matches
    const allItemsMatchRestaurant = menuItems.every(
      (item) => item.restaurantId === restaurantId
    );
    const itemCountMatches = menuItems.length === menuItemIds.length;
    if (!allItemsMatchRestaurant) {
      return res.status(400).send({
        error: "Not all menu items belong to the specified restaurant.",
      });
    } else if (!itemCountMatches) {
      return res.status(400).send({
        error:
          "The number of items passed does not match the number of items available.",
      });
    }

    // Fix logic to calculate total price
    // const totalPrice = menuItems.reduce((acc, currentItem) => {
    //   const quantity = menuItemIds.find(item => item.menuItemId === currentItem.id).quantity;
    //   return acc + (currentItem.price * quantity);
    // }, 0);

    const totalPrice = 100;

    // Create order
    const newOrder = await prisma.order.create({
      data: {
        userId: req.entity.id,
        restaurantId,
        totalPrice,
        status: "created",
      },
    });

    // Prepare order items data
    const orderItemsData = menuItems.map((item) => ({
      orderId: newOrder.id,
      menuItemId: item.id,
      quantity: menuItemIds.find((menuItem) => menuItem.menuItemId === item.id)
        .quantity,
      price: item.price,
    }));

    // Insert order items
    const newOrderItems = await prisma.orderItem.createMany({
      data: orderItemsData,
      skipDuplicates: true,
    });

    res.json({ order: newOrder, orderItemsCount: newOrderItems });
  } catch (error) {
    console.error("Error in insertOrder:", error.message);
    res.status(500).send({ error: error.message });
  }
};

//update order status by restautantid
const updateOrderStatus = async (req, res) => {
  const body = req.body;
  try {
    await orderUpdateSchema.validate(body);

    const orderId = parseInt(req.params.id);
    const restaurantId = req.entity.id;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.restaurantId !== restaurantId) {
      return res.status(404).send({
        error: "order not found or does not belong to the restaurant",
      });
    }

    const updatedOrderStatus = await prisma.order.update({
      where: { id: orderId },
      data: {
        ...order,
        ...body,
      },
    });

    res.send(updatedOrderStatus);
  } catch (error) {
    console.log("Error in updateOrderStatus", error.message);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getUserOrders,
  insertOrder,
  getRestaurantsOrders,
  updateOrderStatus,
};