import connection from "../dbStrategy/postgres.js";

export async function getRentals (req, res) {
  const filterByCustomerId = req.query.customerId;
  const filterByGameId = req.query.gameId;
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