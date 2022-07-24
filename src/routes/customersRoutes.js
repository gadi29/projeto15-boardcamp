import { Router } from "express";

//imports

const router = Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getOneCustomer);
router.post('/customers', customersValidate, createCustomer);
router.put('/customers', customersValidate, editCustomer);

export default router;