import { NextFunction, Router, Request, Response } from 'express';
import { body, param } from 'express-validator';
import ProductsController from '../controllers/ProductsController';
import asyncHandler from 'express-async-handler';

const productRouter = Router();
const productsController = new ProductsController();

//middlewares de validação
const validateProductId = [
  param('id').isUUID().withMessage('Id inválido'),
  (req: Request, res: Response, next: NextFunction) => {
    req.params = req.params || {};
    next();
  },
];

const validateProductCreation = [
  body('name').isString().notEmpty().withMessage('Nome é obrigatório'),
  body('prive')
    .isFloat({ gt: 0 })
    .withMessage('Preço é obrigatório e deve ser maior que zero'),
  body('quantity')
    .isInt({ gt: 0 })
    .withMessage('Quantidade é obrigatório e deve ser maior que zero'),
];

productRouter.get(
  '/',
  asyncHandler((req, res) => productsController.index(req, res)),
);
productRouter.get(
  '/:id',
  validateProductId,
  asyncHandler((req: Request<{ id: string }>, res) =>
    productsController.show(req, res),
  ),
);

productRouter.post(
  '/',
  validateProductCreation,
  asyncHandler((req, res) => productsController.create(req, res)),
);

productRouter.put(
  '/:id',
  [...validateProductId, ...validateProductCreation],
  asyncHandler(
    (
      req: Request<
        { id: string },
        Record<string, unknown>,
        { name: string; price: number; quantity: number }
      >,
      res,
    ) => productsController.update(req, res),
  ),
);

productRouter.delete(
  '/:id',
  validateProductId,
  asyncHandler((req, res) => productsController.delete(req, res)),
);

export default productRouter;
