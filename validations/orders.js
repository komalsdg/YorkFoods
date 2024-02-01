const yup = require("yup");

const orderSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    totalprice: yup.number().required(),
    status: yup.string().required()
  })
  .noUnknown();

const orderUpdateSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    totalprice: yup.number().required(),
    status: yup.string().required()
  })
  .noUnknown();

module.exports = { orderSchema, orderUpdateSchema };
