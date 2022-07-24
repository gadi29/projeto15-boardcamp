import joi from "joi";

const customersSchema = joi.object({
  name: joi.string().trim().required(),
  phone: joi.string().pattern('/[0-9]{10,11}/').required(),
  cpf: joi.string().pattern('/[0-9]{11}/').required(),
  birthday: joi.date().format(['YYYY-MM-DD', 'YYYY/MM/DD', 'DD-MM-YYYY','DD/MM/YYYY']).required()
});

export default customersSchema;