import { Router } from "express";
//import functions

const router = Router();

router.get('/categories', getCategories);
router.post('/categories', categoriesValidate, createCategories);

export default router;