import connection from '../dbStrategy/postgres.js';
import gamesSchema from '../schemas/gamesSchema.js';

async function gamesValidate (req, res, next) {
  const newGame = req.body;

  const validateGame = gamesSchema.validate(newGame);
  if(validateGame.error) {
    return res.status(400).send('Entrada inválida.');
  }

  const {rows: category} = await connection.query('SELECT * FROM categories WHERE id = $1', [newGame.categoryId])
  if (category.length === 0 ) {
    return res.status(400).send('A categoria relacionada não existe.');
  }

  const { rows: game } = await connection.query('SELECT * FROM games WHERE name = $1', [newGame.name]);
  if (game.length > 0 ) {
    return res.status(409).send('Este jogo já existe.');
  }

  res.locals.game = newGame;

  next();
}

export default gamesValidate;