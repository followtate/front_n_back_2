const express = require('express');
const app = express();
const port = 3000;

let products = [
    {id: 1, name: 'Banana', price: 1600},
    {id: 2, name: 'Apple', price: 2000},
    {id: 3, name: 'Orange', price: 2500}
];

app.use(express.json());

//основная страница
app.get('/', (req, res) => {
    res.send('Main page');
});

// Получить все
app.get('/products', (req, res) => {
    res.json(products);
});

// Получить по ID
app.get('/products/:id', (req, res) => {
    let item = products.find(u => u.id == req.params.id); 
    if (item) {
        res.json(item);
    } else {
        res.status(404).send("Product not found");
    }
});

// Создать
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = {
        id: Date.now(),
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Обновить
app.patch('/products/:id', (req, res) => {
    const item = products.find(u => u.id == req.params.id);
    const { name, price } = req.body;

    if (!item) return res.status(404).send("Not found");

    if (name !== undefined) item.name = name;
    if (price !== undefined) item.price = price; 

    res.json(item);
});

// Удалить
app.delete('/products/:id', (req, res) => {
    products = products.filter(p => p.id != req.params.id);
    res.send('Ok');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});