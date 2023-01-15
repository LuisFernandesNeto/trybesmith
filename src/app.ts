import express from 'express';
import ProductsController from './controllers/products.controller';
import UserController from './controllers/users.controller';
import OrdersController from './controllers/orders.controller';
import httpErrorMiddleware from './middlewares/http.error';

const app = express();

app.use(express.json());

const productsController = new ProductsController();
const userController = new UserController();
const ordersController = new OrdersController();

app.post('/products', productsController.create);
app.get('/products', productsController.getAll);
app.post('/users', userController.create);
app.get('/orders', ordersController.getAll);
app.post('/login', httpErrorMiddleware, userController.login);

export default app;
