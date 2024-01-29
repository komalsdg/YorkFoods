const Joi = require("@hapi/joi");
 module.exports = Joi.defaults((schema) =>
   schema.options({
     errors: {
       wrap: {
         label: " ", // For removing quotes from error message
       },
     },
   })
 );