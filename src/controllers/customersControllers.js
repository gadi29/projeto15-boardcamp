import connection from "../dbStrategy/postgres.js";

export async function getCustomers (req, res) {
  const filterCustomers = req.query.cpf;

  try {
    if(filterCustomers) {
      const { rows: customer } = await connection.query(
        `SELECT * FROM customers 
        WHERE cpf LIKE '${filterCustomers}%'`); //implement bindparam
  
      res.status(200).send(customer);
    } else {
      const { rows: listCustomers } = await connection.query(
        `SELECT * FROM customers`);
  
      res.status(200).send(listCustomers);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function getCustomerById (req, res) {
  const { id } = req.params;

  try {
    const {rows: customer} = await connection.query(`
    SELECT * FROM customers WHERE id = $1`, [id]);

    if (customer.length === 0) {
      res.status(404).send('Este cliente não existe.');
    } else {
      res.status(200).send(customer);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
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
  const customerUpdate = res.locals.customer;
  const id = res.locals.id;

  try {
    await connection.query(`
      UPDATE customers
      SET name=$1, phone=$2, cpf=$3, birthday=$4
      WHERE id=$5`,
      [
        customerUpdate.name,
        customerUpdate.phone,
        customerUpdate.cpf,
        customerUpdate.birthday,
        id
      ]);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}