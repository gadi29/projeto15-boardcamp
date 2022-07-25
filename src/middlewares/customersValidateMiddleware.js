import connection from '../dbStrategy/postgres.js';
import customersSchema from '../schemas/customersSchema.js';

export async function newCustomersValidate (req, res, next) {
  const newCustomer = req.body;

  const validateCustomer = customersSchema.validate(newCustomer);
  if(validateCustomer.error) {
    return res.status(400).send('Entrada inválida.');
  }

  const { rows: customer } = await connection.query(`
  SELECT * FROM customers WHERE cpf = $1`, [newCustomer.cpf]);
  if (customer.length > 0 ) {
    return res.status(409).send('Este cliente já existe.');
  }

  res.locals.customer = newCustomer;

  next();
}

export async function updateCustomersValidate (req, res, next) {
  const customerUpdate = req.body;

  const validateCustomer = customersSchema.validate(customerUpdate);
  if(validateCustomer.error) {
    return res.status(400).send('Entrada inválida.');
  }

  const { rows: customer } = await connection.query(`
  SELECT * FROM customers WHERE cpf = $1`, [customerUpdate.cpf]);
  if (customer.length === 0 ) {
    return res.status(404).send('Este cliente não existe.');
  }

  res.locals.customer = customerUpdate;
  res.locals.oldRegister = customer;

  next();
}