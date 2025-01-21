// import { AppDataSource } from '../../../../data-source';
import AppError from '@shared/errors/AppError';
import productRepository from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = await productRepository.createProduct({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}
export default CreateProductService;
