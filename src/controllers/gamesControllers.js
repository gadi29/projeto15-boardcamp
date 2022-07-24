import connection from "../dbStrategy/postgres.js";

export async function getGames (req, res) {
  const filterGame = req.query.name;

  try {
    if(filterGame.length > 0) {
      const { rows: game } = await connection.query(
        `SELECT games.*, categories.name as "categoryName" 
        FROM games JOIN categories 
        ON games."categoryId"=categories.id 
        WHERE games.name LIKE '${filterGame}%'`); //implement bindparam
  
      res.status(200).send(game);
    } else {
      const { rows: listGames } = await connection.query(
        `SELECT games.*, categories.name as "categoryName" 
        FROM games JOIN categories 
        ON games."categoryId"=categories.id`);
  
      res.status(200).send(listGames);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function createGame (req, res) {
  
  
  try {
    
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}