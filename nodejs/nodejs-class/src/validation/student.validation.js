const Joi = require("joi");

class StudentValidation {
  static createStudent = Joi.object({
        name: Joi.string().trim().required().messages({
        "string.empty": "Name is required",
        "any.required": "Name is required",
        }),

        email: Joi.string().trim().email().required().messages({
        "string.email": "Please provide a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is required",
        }),

        phone: Joi.string()
        .trim()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.pattern.base": "Please provide a valid 10-digit mobile number",
            "string.empty": "Phone number is required",
            "any.required": "Phone number is required",
        }),

       address: Joi.string().trim().min(6).max(15).required().messages({
        "string.empty": "Address is required",
        "any.required": "Address is required",
        }),
  });


}

module.exports = StudentValidation;
