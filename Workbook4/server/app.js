const express = require("express");
const cors = require("cors");
const app = express();

// Разрешаем запросы с фронтенда (порт 3000 - стандарт для React)
app.use(cors()); 
app.use(express.json());

// ВАЖНО: Путь должен быть /api/flowers, как в твоем src/api/index.js
let flowers = [
    { id: 1, name: "Роза Красная", category: "Розы", price: 150, count: 10, description: "Классика" },
    { id: 2, name: "Лилия Белая", category: "Лилии", price: 250, count: 5, description: "Ароматная" },
    { id: 3, name: "Тюльпан", category: "Тюльпаны", price: 80, count: 50, description: "Весенний" },
    { id: 4, name: "Хризантема", category: "Хризантемы", price: 120, count: 20, description: "Осенняя" },
    { id: 5, name: "Орхидея", category: "Орхидеи", price: 900, count: 3, description: "Экзотика" },
    { id: 6, name: "Пион", category: "Пионы", price: 350, count: 12, description: "Пышный" },
    { id: 7, name: "Ромашка", category: "Полевые", price: 50, count: 100, description: "Простая" },
    { id: 8, name: "Гвоздика", category: "Гвоздики", price: 70, count: 40, description: "Стойкая" },
    { id: 9, name: "Ирис", category: "Ирисы", price: 110, count: 15, description: "Синий" },
    { id: 10, name: "Гортензия", category: "Гортензии", price: 400, count: 8, description: "Голубая" }
];

// Маршруты (Routes)
app.get("/api/flowers", (req, res) => {
    res.json(flowers);
});

app.post("/api/flowers", (req, res) => {
    const newFlower = { ...req.body, id: Date.now() };
    flowers.push(newFlower);
    res.status(201).json(newFlower);
});

app.patch("/api/flowers/:id", (req, res) => {
    const id = Number(req.params.id);
    flowers = flowers.map(f => f.id === id ? { ...f, ...req.body } : f);
    res.json(flowers.find(f => f.id === id));
});

app.delete("/api/flowers/:id", (req, res) => {
    const id = Number(req.params.id);
    flowers = flowers.filter(f => f.id !== id);
    res.sendStatus(204);
});

app.listen(5001, () => {
    console.log("✅ Бэкенд запущен на http://localhost:5001");
});
