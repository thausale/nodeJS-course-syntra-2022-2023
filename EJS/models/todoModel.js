import { Joi } from "express-validation";

export const todoModel = {
  body: Joi.object({
    title: Joi.string().required(),
    completed: Joi.boolean().required(),
    email: Joi.string().email().required(),
  }),
};
