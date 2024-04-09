const express = require('express');

const ProductsService = require('../services/productService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createProductShema, updateProductShema, getProductShema  } = require('../schemas/productSchemas');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
    const products = await service.find();
    res.json(products);
});

router.get('/filter', (req, res) => {
    res.send('Yo soy un filter');
});

router.get('/:id',
validatorHandler(getProductShema, 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.findOne(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.post('/',
validatorHandler(createProductShema, 'body'),
    async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json ({
        newProduct
    })
});
router.patch('/:id',
validatorHandler(getProductShema, 'params'), 
validatorHandler(updateProductShema, 'body'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const product = await service.update(id, body);
        res.json (product);
    } catch (error) {
        next(error);
    }
    
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const rta = await service.delete(id, body);
    
    res.json (rta);
});

module.exports = router;