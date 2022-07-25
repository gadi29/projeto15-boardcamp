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
  const { id } = req.params;

  const validateCustomer = customersSchema.validate(customerUpdate);
  if(validateCustomer.error) {
    return res.status(400).send('Entrada inválida.');
  }

  const { rows: thisCustomer } = await connection.query(`
  SELECT * FROM customers WHERE id = $1`, [id]);
  if (thisCustomer.length === 0 ) {
    return res.status(404).send('Este cliente não existe.');
  }

  const { rows: listOtherCustomers } = await connection.query(`
  SELECT * FROM customers WHERE id NOT IN ($1)`, [id]);
  const existCPF = listOtherCustomers.filter(customer => customer.cpf === customerUpdate.cpf);
  if (existCPF.length > 0 ) {
    return res.status(409).send('Este cpf já existe.');
  }

  res.locals.customer = customerUpdate;
  res.locals.id = id;

  next();
}