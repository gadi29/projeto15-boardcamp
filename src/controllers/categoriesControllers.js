import connection from "../dbStrategy/postgres.js";

export async function getCategories (req, res) {

}

export async function createCategory (req, res) {
  const category = res.locals.category;
  
  try {
    await connection.query('INSERT INTO categories (name) VALUES ($1)', [category.name]);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}