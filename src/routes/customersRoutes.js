import { Router } from "express";

//imports
import customersValidate from "../middlewares/customersValidateMiddleware.js";
import { getCustomers, getCustomerById, createCustomer, editCustomer } from "../controllers/customersControllers.js";

const router = Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.post('/customers', customersValidate, createCustomer);
router.put('/customers', customersValidate, editCustomer);

export default router;