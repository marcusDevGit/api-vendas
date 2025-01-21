import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import asyncHandler from 'express-async-handler';

const productRouter = Router();
const productsController = new ProductsController();

productRouter.get(
  '/',
  asyncHandler((req, res) => productsController.index(req, res)),
);
productRouter.get('/:id', (req, res) => productsController.show(req, res));
productRouter.post('/', (req, res) => productsController.create(req, res));
productRouter.put('/:id', (req, res) => productsController.update(req, res));
productRouter.delete('/:id', (req, res) => productsController.delete(req, res));

export default productRouter;
