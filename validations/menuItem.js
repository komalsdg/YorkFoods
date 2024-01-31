const yup = require("yup");

const menuItemSchema = yup.object().shape({
  name: yup.string().required(),
  restautantId: yup.number().required(),
  price: yup.number().required(),
  quantity: yup.number().required()
});

const menuItemUpdateSchema = yup.object().shape({
    name: yup.string(),
    restautantId: yup.number(),
    price: yup.number(),
    quantity: yup.number()
});

module.exports = { menuItemSchema, menuItemUpdateSchema };