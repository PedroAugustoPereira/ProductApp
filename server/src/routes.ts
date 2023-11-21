import { Router } from 'express';

import productsController from './controllers/productsController';

const router = Router();

router.get("/", productsController.index);
router.get("/get/:id", productsController.get);
router.get("/search", productsController.search);
router.post("/create", productsController.create);
router.put("/update/:id", productsController.update);
router.delete("/delete/:id", productsController.remove);

export default router;
