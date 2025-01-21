import { Router } from 'express';
import productRouter from '@modules/products/routes/products.routes';

const router = Router();

router.use('/products', productRouter);

export default router;
