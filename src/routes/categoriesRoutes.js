import { Router } from "express";

import categoriesValidate from "../middlewares/categoriesValidateMiddleware.js";
import { getCategories, createCategory } from "../controllers/categoriesControllers.js";

const router = Router();

router.get('/categories', getCategories);
router.post('/categories', categoriesValidate, createCategory);

export default router;