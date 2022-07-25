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

      const returnRentals = listRentals.map(rental => {
        const customer = listCustomers.filter(customer => customer.id === rental.customerId);
        const game = listGames.filter(game => game.id === rental.gameId);

        return {...rental, customer: customer[0], game: game[0]};
      })

      res.status(200).send(returnRentals);

    } else if(filterByGameId) {
      const { rows: listRentals } = await connection.query(
        `SELECT * FROM rentals WHERE rentals."gameId"=$1`, [filterByGameId]
      );

      const returnRentals = listRentals.map(rental => {
        const customer = listCustomers.filter(customer => customer.id === rental.customerId);
        const game = listGames.filter(game => game.id === rental.gameId);

        return {...rental, customer: customer[0], game: game[0]};
      })

      res.status(200).send(returnRentals);

    } else {
      const { rows: listRentals } = await connection.query(
        `SELECT * FROM rentals`
      );

      const returnRentals = listRentals.map(rental => {
        const customer = listCustomers.filter(customer => customer.id === rental.customerId);
        const game = listGames.filter(game => game.id === rental.gameId);

        return {...rental, customer: customer[0], game: game[0]};
      })
        
      res.status(200).send(returnRentals);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function createRental (req, res) {
  const newRental = res.locals.rental;

  try {
    await connection.query(
      `INSERT INTO rentals 
      ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
      [
        newRental.customerId,
        newRental.gameId,
        newRental.rentDate,
        newRental.daysRented,
        newRental.returnDate,
        newRental.originalPrice,
        newRental.delayFee
      ]);

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function closeRental (req, res) {
  const { id } = req.params;
}

export async function deleteRental (req, res) {
  const { id } = req.params;
}