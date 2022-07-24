import { Router } from "express";

//imports
import gamesValidate from "../middlewares/gamesValidateMiddleware.js";

const router = Router();

router.get('/games', getGames);
router.post('/games', gamesValidate, createGame);

export default router;