import { Router } from "express";

import rentalsValidate from "../middlewares/rentalsValidateMiddleware.js";
import { getRentals, createRental, closeRental, deleteRental } from "../controllers/rentalsControllers.js";

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', rentalsValidate, createRental);
router.post('/rentals/:id/return', closeRental);
router.delete('/rentals/:id', deleteRental);

export default router;