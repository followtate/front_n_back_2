
const express = require("express");
const cors = require("cors");
const path = require('path');
const bcrypt = require('bcrypt'); 
const { nanoid } = require('nanoid'); // Import nanoid
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

const app = express();
app.use(cors()); 
app.use(express.json());

const publicPath = path.resolve(__dirname, '..', 'public')
app.use('/public', express.static(publicPath));
// --- DATA STORES ---
let flowers = [
    { id: nanoid(), name: "Роза Красная", category: "Розы", price: 150, count: 10, description: "Классика" , image: "/public/images/RED_ROSE.jpg",},
    { id: nanoid(), name: "Лилия Белая", category: "Лилии", price: 250, count: 5, description: "Ароматная" ,image: "/public/images/LILY_WHITE.jpg",},
    { id: nanoid(), name: "Тюльпан", category: "Тюльпаны", price: 80, count: 50, description: "Весенний" ,image: "/public/images/TULIP_YELLOW.jpg",},
    { id: nanoid(), name: "Хризантема", category: "Хризантемы", price: 120, count: 20, description: "Осенняя",image: "/public/images/CHRYSANTHEMUM.jpg", },
    { id: nanoid(), name: "Орхидея", category: "Орхидеи", price: 900, count: 3, description: "Экзотика",image: "/public/images/ORCHID.jpg",},
    { id: nanoid(), name: "Пион", category: "Пионы", price: 350, count: 12, description: "Пышный" ,image: "/public/images/PEONY.jpg",},
    { id: nanoid(), name: "Ромашка", category: "Полевые", price: 50, count: 100, description: "Простая" ,image: "/public/images/CHAMOMILE.jpg",},
    { id: nanoid(), name: "Гвоздика", category: "Гвоздики", price: 70, count: 40, description: "Стойкая",image: "/public/images/CARNATION.jpg", },
    { id: nanoid(), name: "Ирис", category: "Ирисы", price: 110, count: 15, description: "Синий" ,image: "/public/images/IRIS.jpg",},
    { id: nanoid(), name: "Гортензия", category: "Гортензии", price: 400, count: 8, description: "Голубая" ,image: "/public/images/HYDRANGEA.jpg",}
];


let users = []; 

// Automatic Test Account
(async () => {
    const hashedPW = await bcrypt.hash("12345", 10);
    users.push({ 
        id: nanoid(),
        username: "admin", 
        password: hashedPW 
    });
    console.log("--> Test Account Ready: admin / 12345");
})();


// REGISTER: 
app.post("/api/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { 
            id: nanoid(), 
            username, 
            password: hashedPassword 
        };
        users.push(newUser);
        res.status(201).json({ message: "User created", id: newUser.id });
    } catch (e) { res.status(500).json({ error: "Fail" }); }
});

// LOGIN:
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        res.json({ message: "Success", user: { id: user.id, username: user.username } });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// GET FLOWERS
app.get("/api/flowers", (req, res) => res.json(flowers));

// CREATE FLOWER: 
app.post("/api/flowers", (req, res) => {
    const newFlower = { 
        ...req.body, 
        id: nanoid() 
    };
    flowers.push(newFlower);
    res.status(201).json(newFlower);
});

// DELETE FLOWER: 
app.delete("/api/flowers/:id", (req, res) => {
    const { id } = req.params;
    flowers = flowers.filter(f => f.id !== id);
    res.sendStatus(204);
});

app.listen(5001, () => {
    console.log("Сервер запущен на http://localhost:5001");
});