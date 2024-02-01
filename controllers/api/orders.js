const prisma = require("../../prismaClient");

const {
  orderSchema,
  orderUpdateSchema,
} = require("../../validations/orders");

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
        OrderItems:true,
      },
      where: {
        userId: user.id,
      },
    });
    res.json(orders);
  } catch (error) {
    console.log("Error in getOrders", error.message);
    res.status(500).send({ error: error.message });
  }
};

//insert order
const insertOrder = async (req, res) => {
  try {
    const {
      userId,
      restaurantId,
      totalPrice,
      status
    } = req.body;
    await orderSchema.validate(req.body, { stripUnknown: false });
    //order
    const newOrder = await prisma.order.create({
      data: {
        userId: req.entity.id,
        restaurantId,
        totalPrice,
        status:'created'
      },
    });
    //orderitem
    const newOrderItems = await prisma.orderitem.createMany({
        data: orderItems,
        skipDuplicates: true
    });
    res.json(newOrder);
  } catch (error) {
    console.log("Error in insertOrder", error.message);
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
  getUserOrders, insertOrder
};
