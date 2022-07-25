import { Router } from "express";

//import middleware
//import controllers

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', rentalsValidate, createRental);
router.post('/rentals/:id/return', closeRental);
router.delete('/rentals/:id', deleteRental);

export default router;