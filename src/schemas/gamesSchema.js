import joi from "joi";

const gamesSchema = joi.object({
  name: joi.string().trim().required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().integer().greater(0).required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().greater(0).required()
});

export default gamesSchema;