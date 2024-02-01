const yup = require("yup");

const reviewSchema = yup
  .object()
  .shape({
    reviewableId: yup.number().required(), 
    reviewableType: yup.string()
    .oneOf([
        "MENUITEM",
        "RESTAURANT"
    ]),
    rating: yup.number().required(),
    comment: yup.string().required(),
  })
  .noUnknown();

module.exports = { reviewSchema };