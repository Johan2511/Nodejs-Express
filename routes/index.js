const productRouter = require ('./productsRouter');
const usersRouter = require ('./userRouter');
const categoriesRouter = require ('./categoriesRouter');

function routerApi(app) {
    app.use('/api/products', productRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/categories', categoriesRouter);
}

module.exports = routerApi;