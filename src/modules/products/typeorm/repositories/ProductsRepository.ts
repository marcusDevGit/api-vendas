import { AppDataSource } from '../../../../data-source';
import { Repository } from 'typeorm';
import Product from '../entities/Product';

class ProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  public async find(): Promise<Product[]> {
    return this.ormRepository.find();
  }

  public async findOne(
    conditions: Partial<Product>,
  ): Promise<Product | undefined> {
    const product = await this.ormRepository.findOneBy(conditions);
    return product ?? undefined; // Trata null como undefined
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return product ?? undefined;
  }

  public async createProduct(data: Partial<Product>): Promise<Product> {
    const product = this.ormRepository.create(data);
    await this.ormRepository.save(product);
    return product;
  }
  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}

export default new ProductRepository();
