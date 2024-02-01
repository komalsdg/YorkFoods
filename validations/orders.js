const yup = require("yup");

const orderSchema = yup
  .object()
  .shape({
    totalprice: yup.number().required(),
    status: yup.string().required()
  })
  .noUnknown();

const orderUpdateSchema = yup
  .object()
  .shape({
    totalprice: yup.number().required(),
    status: yup.string().required()
  })
  .noUnknown();

module.exports = { orderSchema, orderUpdateSchema };
