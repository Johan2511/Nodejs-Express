const express = require('express');

const UserService = require('../services/userService')

const router = express.Router();
const service = new UserService();


router.get('/',(req, res) => {
    const user = service.find();
    res.json(user);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = service.findOne(id);
    res.json(user);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const user = service.update(id, body);
    res.json (user);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const deleteUser = service.delete(id, body);
    
    res.json (deleteUser);
})

router.get('/', (req, res) => {
    const { limit, offset } = req.query;
    if (limit && offset) {
        res.json({ 
            limit,
            offset,
        }); 
    } else {
        res.send('No hay parametros');
    }
});

module.exports = router;