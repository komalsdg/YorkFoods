const yup = require("yup");

const userUpdateSchema = yup.object().shape({
  name: yup.string(),
  cuisinePreference: yup
    .string()
    .oneOf([
      "ITALIAN",
      "MEXICAN",
      "CHINESE",
      "JAPANESE",
      "INDIAN",
      "AMERICAN",
      "FRENCH",
      "KOREAN",
      "BRITISH",
      "MEDITERRANEAN",
      "CARIBBEAN",
      "CONTINENTAL",
    ]),
}).noUnknown();

const passwordUpdateSchema = yup.object().shape({
  newPassword: yup.string().required().min(8),
  resetPasswordToken: yup.string().required(),
  email: yup.string().email().required(),
}).noUnknown();

module.exports = { userUpdateSchema, passwordUpdateSchema };