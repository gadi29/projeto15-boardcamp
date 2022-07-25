import { Router } from "express";

//imports
import { newCustomersValidate, updateCustomersValidate } from "../middlewares/customersValidateMiddleware.js";
import { getCustomers, getCustomerById, createCustomer, editCustomer } from "../controllers/customersControllers.js";

const router = Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerById);
router.post('/customers', newCustomersValidate, createCustomer);
router.put('/customers/:id', updateCustomersValidate, editCustomer);

export default router;