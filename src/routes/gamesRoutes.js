import { Router } from "express";

//imports
import gamesValidate from "../middlewares/gamesValidateMiddleware.js";
import { getGames, createGame } from "../controllers/gamesControllers.js";

const router = Router();

router.get('/games', getGames);
router.post('/games', gamesValidate, createGame);

export default router;