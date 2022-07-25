import { Router } from "express";

import { newRentValidate, existAndOpenRentValidate } from "../middlewares/rentalsValidateMiddleware.js";
import { getRentals, createRent, closeRent, deleteRent } from "../controllers/rentalsControllers.js";

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', newRentValidate, createRent);
router.post('/rentals/:id/return', existAndOpenRentValidate, closeRent);
router.delete('/rentals/:id', existAndOpenRentValidate, deleteRent);

export default router;