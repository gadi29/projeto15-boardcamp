import joi from "joi";

const gamesSchema = joi.object({
  name: joi.string().trim().required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().integer().min(1).required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().min(1).required()
});

export default gamesSchema;