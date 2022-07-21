import connection from '../dbStrategy/postgres.js';
import categoriesSchema from '../schemas/categoriesSchema.js';

async function categoriesValidate (req, res, next) {
  const newCategory = req.body;

  const validateCategory = categoriesSchema.validate(newCategory);
  if(validateCategory.error) {
    return res.send('Entrada inválida.').status(400);
  }

  const { rows: category } = await connection.query(`SELECT * FROM categories WHERE name = $1`, [newCategory.name]);
  if (category) {
    return res.send('Esta categoria já existe.').status(409);
  }

  res.locals.category = newCategory;

  next();
}

export default categoriesValidate;