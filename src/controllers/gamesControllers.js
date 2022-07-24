import connection from "../dbStrategy/postgres.js";

export async function getGames (req, res) {
  try {
    const { rows: listCategories } = await connection.query('SELECT * FROM categories');
    res.status(200).send(listCategories);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function createGame (req, res) {
  const category = res.locals.category;
  
  try {
    await connection.query('INSERT INTO categories (name) VALUES ($1)', [category.name]);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}