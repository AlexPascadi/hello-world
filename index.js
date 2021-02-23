const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();
server.use(cors()); 
server.use(bodyParser.json());

// Initial GET request handler
server.get('/', (req, res) => {
    res.send('Hello, world!')
});

// Requirements for pizza app:
// GET, POST, PUT, PATCH, DELETE
// - retrieve all outstanding orders
//     GET /orders
// - create new order
//     POST /orders
// - delete orders 
//     DELETE /orders/<order id>
// - update an order
//     PATCH /orders/<order id> 
// (could use PUT as well, but PATCH is
// better for a specific order)

// Simulation of mini-database:
const orders = [
    {
        id: 0,
        customerName: 'Aditya',
        cheese: 'mozarella',
        sauce: 'tomato',
        toppings: ['basil'],
    },
]
let currentId = 1;

server.get('/orders', (req, res) => {
    res.send(orders);
});

server.post('/orders', (req, res) => {
    // {
    //     "customerName": "jim",
    //     "cheese": "parmesan",
    //     "sauce": "tomato",
    //     "toppings": ["pepperoni"]
    // }
    const order = req.body;
    order.id = currentId;
    currentId++;
    orders.push(order);
    res.send({ success: true });
});

server.delete('/orders/:orderId', (req, res) => {
    const orderId = parseInt(req.params.orderId);

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === orderId) {
            orders.splice(i, 1);
            res.send({ success: true });
        }
    }
});

server.patch('/orders/:orderId', (req, res) => {
    const orderId = parseInt(req.params.orderId);

    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === orderId) {
            Object.assign(orders[i], req.body);
            res.send({ success: true });
        }
    }
});

// Starting up the server
server.listen(3000, () => {
    console.log('Server has started');
});

