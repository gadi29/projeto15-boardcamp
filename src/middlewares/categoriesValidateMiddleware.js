import connection from '../dbStrategy/postgres.js';
import categoriesSchema from '../schemas/categoriesSchema.js';

async function categoriesValidate (req, res, next) {
  const newCategory = req.body;

  const validateCategory = categoriesSchema.validate(newCategory);
  if(validateCategory.error) {
    return res.status(400).send('Entrada inválida.');
  }

  const { rows: category } = await connection.query('SELECT * FROM categories WHERE name = $1', [newCategory.name]);
  if (category.length > 0 ) {
    return res.status(409).send('Esta categoria já existe.');
  }

  res.locals.category = newCategory;

  next();
}

export default categoriesValidate;