import { Router } from "express";

//imports

const router = Router();

router.get('/games', getGames);
router.post('/games', gamesValidate, createGame);

export default router;