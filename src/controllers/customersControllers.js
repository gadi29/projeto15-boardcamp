import connection from "../dbStrategy/postgres.js";

export async function getCustomers (req, res) {
  
}

export async function getOneCustomer (req, res) {
  
}

export async function createCustomer (req, res) {
  const customer = res.locals.customer;
  
  try {
    await connection.query(
      `INSERT INTO customers (name, phone, cpf, birthday) 
      VALUES ($1, $2, $3, $4)`, 
      [customer.name, customer.phone, customer.cpf, customer.birthday]);

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function editCustomer (req, res) {
  
}