import dayjs from "dayjs";
import connection from "../dbStrategy/postgres.js";

export async function getRentals (req, res) {
  const filterByCustomerId = req.query.customerId;
  const filterByGameId = req.query.gameId;

  try {
    const { rows: listCustomers } = await connection.query(
      `SELECT id, name FROM customers`
    );

    const { rows: listGames } = await connection.query(
      `SELECT games.id, games.name, games."categoryId", categories.name as "categoryName" 
      FROM games
      JOIN categories ON games."categoryId"=categories.id`
    );

    if(filterByCustomerId) {
      const { rows: listRentals } = await connection.query(
        `SELECT * FROM rentals WHERE rentals."customerId"=$1`, [filterByCustomerId]
      );

      const returnRentals = listRentals.map(rent => {
        const customer = listCustomers.filter(customer => customer.id === rent.customerId);
        const game = listGames.filter(game => game.id === rent.gameId);

        return {...rent, customer: customer[0], game: game[0]};
      })

      res.status(200).send(returnRentals);

    } else if(filterByGameId) {
      const { rows: listRentals } = await connection.query(
        `SELECT * FROM rentals WHERE rentals."gameId"=$1`, [filterByGameId]
      );

      const returnRentals = listRentals.map(rent => {
        const customer = listCustomers.filter(customer => customer.id === rent.customerId);
        const game = listGames.filter(game => game.id === rent.gameId);

        return {...rent, customer: customer[0], game: game[0]};
      })

      res.status(200).send(returnRentals);

    } else {
      const { rows: listRentals } = await connection.query(
        `SELECT * FROM rentals`
      );

      const returnRentals = listRentals.map(rent => {
        const customer = listCustomers.filter(customer => customer.id === rent.customerId);
        const game = listGames.filter(game => game.id === rent.gameId);

        return {...rent, customer: customer[0], game: game[0]};
      })
        
      res.status(200).send(returnRentals);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function createRent (req, res) {
  const newRent = res.locals.rent;

  try {
    await connection.query(
      `INSERT INTO rentals 
      ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
      [
        newRent.customerId,
        newRent.gameId,
        newRent.rentDate,
        newRent.daysRented,
        newRent.returnDate,
        newRent.originalPrice,
        newRent.delayFee
      ]);

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function closeRent (req, res) {
  const rent = res.locals.rent;

  try{
    const { rows: game } = await connection.query(`
    SELECT * FROM games WHERE id=$1`, [rent.gameId]);

    const delayDays = Math.floor(((dayjs(dayjs() - (dayjs(rent.rentDate).add(rent.daysRented, 'day'))).valueOf())/3600000)/24);

    if(delayDays <= 0) {
      await connection.query(`
      UPDATE rentals
      SET "returnDate"=$1, "delayFee"=0
      WHERE id=$2`, 
      [
        dayjs().format('YYYY-MM-DD'),
        rent.id
      ]);
    } else {
      await connection.query(`
      UPDATE rentals
      SET "returnDate"=$1, "delayFee"=$2
      WHERE id=$3`, 
      [
        dayjs().format('YYYY-MM-DD'),
        delayDays * game[0].pricePerDay,
        rent.id
      ]);
    }
    
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function deleteRent (req, res) {
  const { id } = res.locals.rent;

  try {
    await connection.query(`
    DELETE FROM rentals WHERE id = $1`, [id]
    );

    res.sendStatus(200);
  } catch(error) {
    console.error(error);
    res.sendStatus(500);
  }
}