import express from 'express';
import ProductsController from './controllers/products.controller';
import UserController from './controllers/users.controller';

const app = express();

app.use(express.json());

const productsController = new ProductsController();
const userController = new UserController();

app.post('/products', productsController.create);
app.get('/products', productsController.getAll);
app.post('/users', userController.create);

export default app;
