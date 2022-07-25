import dayjs from 'dayjs';
import connection from '../dbStrategy/postgres.js';
import rentalsSchema from '../schemas/rentalsSchema.js';

export async function newRentValidate (req, res, next) {
  const newRent = req.body;

  const validateRent = rentalsSchema.validate(newRent);
  if(validateRent.error) {
    return res.status(400).send('Entrada inválida.');
  }

  const {rows: customer} = await connection.query(`
  SELECT * FROM customers WHERE id = $1`, [newRent.customerId]);
  
  const {rows: game} = await connection.query(`
  SELECT * FROM games WHERE id = $1`, [newRent.gameId]);
  
  if (customer.length === 0 || game.length === 0) {
    return res.status(400).send('Cliente ou jogo não encontrados.');
  }

  const {rows: gameRentals} = await connection.query(`
  SELECT * FROM rentals WHERE "gameId" = $1`, [newRent.gameId]);

  const gameRentalsOpen = gameRentals.filter(rent => rent.returnDate === null);

  if (game[0].stockTotal === gameRentalsOpen.length) {
    return res.status(400).send('Não disponível no momento.')
  }

  res.locals.rent = {
    ...newRent,
    rentDate: dayjs().format('YYYY-MM-DD'),
    returnDate: null,
    originalPrice: (game[0].pricePerDay * newRent.daysRented),
    delayFee: null
  };

  next();
}

export async function existAndOpenRentValidate (req, res, next) {
  const { id } = req.params;

  const { rows: rent } = await connection.query(`
  SELECT * FROM rentals WHERE id = $1`, [id]);
  
  if (rent.length === 0) {
    return res.status(404).send('Aluguel não encontrado.');
  }

  if(rent[0].returnDate !== null) {
    return res.status(400).send('Este aluguel já está finalizado.');
  }

  res.locals.rent = rent[0];

  next();
}