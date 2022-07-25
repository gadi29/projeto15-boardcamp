import connection from '../dbStrategy/postgres.js';
import rentalsSchema from '../schemas/rentalsSchema.js';

async function rentalsValidate (req, res, next) {
  const newRental = req.body;

  const validateRental = rentalsSchema.validate(newRental);
  if(validateRental.error) {
    return res.status(400).send('Entrada inválida.');
  }

  const {rows: customer} = await connection.query(`
  SELECT * FROM customers WHERE id = $1`, [newRental.customerId]);
  
  const {rows: game} = await connection.query(`
  SELECT * FROM games WHERE id = $1`, [newRental.gameId]);
  
  if (customer.length === 0 || game.length === 0) {
    return res.status(400).send('Cliente ou jogo não encontrados.');
  }

  const {rows: gameRentals} = await connection.query(`
  SELECT * FROM rentals WHERE "gameId"=$1`, [newRental.gameId]);
  if (game.stockTotal === gameRentals.length) {
    return res.status(400).send('Não disponível no momento.')
  }

  res.locals.rental = {
    ...newRental,
    rentDate: new Date(),
    returnDate: null,
    originalPrice: (game[0].pricePerDay * newRental.daysRented),
    delayFee: null
  };

  next();
}

export default rentalsValidate;