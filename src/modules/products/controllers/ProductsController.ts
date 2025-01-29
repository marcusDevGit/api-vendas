import { Request, Response } from 'express';
import ListProductsService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductsController {
  public async index(req: Request, res: Response): Promise<void> {
    const listProducts = new ListProductsService();
    const products = await listProducts.execute();
    res.json(products);
  }

  public async show(
    req: Request<{ id: string }>,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;
    const showProduct = new ShowProductService();
    const product = await showProduct.execute({ id });
    res.json(product);
  }

  public async create(
    req: Request<
      unknown,
      unknown,
      { name: string; price: number; quantity: number }
    >,
    res: Response,
  ): Promise<void> {
    const { name, price, quantity } = req.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({ name, price, quantity });
    res.json(product);
  }

  public async update(
    req: Request<
      { id: string },
      Record<string, unknown>,
      { name: string; price: number; quantity: number }
    >,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({ id, name, price, quantity });
    res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ id });
    res.json({ message: 'Product deleted successfully' });
    res.json([]);
  }
}
