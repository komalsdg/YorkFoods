const yup = require('yup');

const userRegistrationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  cuisinePreference: yup.string().oneOf(['ITALIAN', 'MEXICAN', 'CHINESE', 'JAPANESE', 'INDIAN', 'AMERICAN', 'FRENCH', 'KOREAN', 'BRITISH', 'MEDITERRANEAN', 'CARIBBEAN', 'CONTINENTAL', null]).required()
});

module.exports = { userRegistrationSchema };