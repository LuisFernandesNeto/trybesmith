import connection from '../models/connection';
import ProductModel from '../models/products.model';
import Product from '../interfaces/products.interface';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  } 

  public create(product: Product): Promise<Product> {
    return this.model.create(product);
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }
}

export default ProductService;