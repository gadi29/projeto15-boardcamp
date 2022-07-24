import connection from '../dbStrategy/postgres.js';
import customersSchema from '../schemas/customersSchema.js';

async function customersValidate (req, res, next) {
  const newCustomer = req.body;

  const validateCustomer = customersSchema.validate(newCustomer);
  if(validateCustomer.error) {
    return res.status(400).send('Entrada inválida.');
  }

  const { rows: customer } = await connection.query('SELECT * FROM customers WHERE cpf = $1', [newCustomer.cpf]);
  if (game.length > 0 ) {
    return res.status(409).send('Este usuário já existe.');
  }

  res.locals.customer = newCustomer;

  next();
}

export default customersValidate;