import { Router } from "express";
//import functions
import categoriesValidate from "../middlewares/categoriesValidateMiddleware.js";

const router = Router();

router.get('/categories', getCategories);
router.post('/categories', categoriesValidate, createCategories);

export default router;