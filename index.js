const express = require('express');
const cors = require ('cors');
const routerApi = require('./routes/')

const {logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

const app = express();
const port = 3000;

app.use(express.json());

const whiteList = ['http://localhost:127.0.0.1:5500', 'http://myapp.co'];
const options = {
    origin: (origin, cb) => {
        if (whiteList.includes(origin)) {
            cb(null, true);
        } else {
        cb(new Error('No permitido'));
        }
    }
}
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola soy un nuevo endpoint!');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Mi port: ' + port);
});