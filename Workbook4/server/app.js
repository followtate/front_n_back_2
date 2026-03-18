const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('swagger-ui-express');

app.use(cors()); 
app.use(express.json());

const fs = require('fs');


const publicPath = path.resolve(__dirname, '..', 'public');

console.log("Путь к статике:", publicPath);
if (!fs.existsSync(publicPath)) {
    console.error("ОШИБКА: Папка public не найдена по этому адресу!");
}

app.use('/public', express.static(publicPath, {
    setHeaders: (res) => {
        res.set('Access-Control-Allow-Origin', '*'); // На всякий случай для Safari
    }
}));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flower Shop API',
      version: '1.0.0',
      description: 'API для управления каталогом цветов (Практическое занятие №4)',
    },
    servers: [
      {
        url: 'http://localhost:5001',
        description: 'Локальный сервер разработки',
      },
    ],
  },

  apis: ['./server/app.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Flower:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный ID цветка (генерируется автоматически)
 *         name:
 *           type: string
 *           description: Название цветка
 *         category:
 *           type: string
 *           description: Категория (Розы, Лилии и т.д.)
 *         price:
 *           type: number
 *           description: Цена за штуку
 *         count:
 *           type: integer
 *           description: Количество в наличии
 *         description:
 *           type: string
 *           description: Краткое описание
 *       example:
 *         id: 1
 *         name: "Роза Красная"
 *         category: "Розы"
 *         price: 150
 *         count: 10
 *         description: "Классическая красная роза"
 */

let flowers = [
    { id: 1, name: "Роза Красная", category: "Розы", price: 150, count: 10, description: "Классика" , image: "/public/images/RED_ROSE.jpg",},
    { id: 2, name: "Лилия Белая", category: "Лилии", price: 250, count: 5, description: "Ароматная" ,image: "/public/images/LILY_WHITE.jpg",},
    { id: 3, name: "Тюльпан", category: "Тюльпаны", price: 80, count: 50, description: "Весенний" ,image: "/public/images/TULIP_YELLOW.jpg",},
    { id: 4, name: "Хризантема", category: "Хризантемы", price: 120, count: 20, description: "Осенняя",image: "/public/images/CHRYSANTHEMUM.jpg", },
    { id: 5, name: "Орхидея", category: "Орхидеи", price: 900, count: 3, description: "Экзотика",image: "/public/images/ORCHID.jpg",},
    { id: 6, name: "Пион", category: "Пионы", price: 350, count: 12, description: "Пышный" ,image: "/public/images/PEONY.jpg",},
    { id: 7, name: "Ромашка", category: "Полевые", price: 50, count: 100, description: "Простая" ,image: "/public/images/CHAMOMILE.jpg",},
    { id: 8, name: "Гвоздика", category: "Гвоздики", price: 70, count: 40, description: "Стойкая",image: "/public/images/CARNATION.jpg", },
    { id: 9, name: "Ирис", category: "Ирисы", price: 110, count: 15, description: "Синий" ,image: "/public/images/IRIS.jpg",},
    { id: 10, name: "Гортензия", category: "Гортензии", price: 400, count: 8, description: "Голубая" ,image: "/public/images/HYDRANGEA.jpg",}
];
/**
 * @swagger
 * /api/flowers:
 *   get:
 *     summary: Получить список всех цветов
 *     tags: [Flowers]
 *     responses:
 *       200:
 *         description: Успешное получение списка цветов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Flower'
 */
app.get("/api/flowers", (req, res) => {
    res.json(flowers);
});

/**
 * @swagger
 * /api/flowers:
 *   post:
 *     summary: Добавить новый цветок
 *     tags: [Flowers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flower'
 *     responses:
 *       201:
 *         description: Цветок успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flower'
 */
app.post("/api/flowers", (req, res) => {
    const newFlower = { ...req.body, id: Date.now() };
    flowers.push(newFlower);
    res.status(201).json(newFlower);
});

/**
 * @swagger
 * /api/flowers/{id}:
 *   patch:
 *     summary: Частично обновить данные цветка
 *     tags: [Flowers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID цветка
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flower'
 *     responses:
 *       200:
 *         description: Данные успешно обновлены
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flower'
 *       404:
 *         description: Цветок не найден
 */
app.patch("/api/flowers/:id", (req, res) => {
    const id = Number(req.params.id);
    flowers = flowers.map(f => f.id === id ? { ...f, ...req.body } : f);
    res.json(flowers.find(f => f.id === id));
});

/**
 * @swagger
 * /api/flowers/{id}:
 *   delete:
 *     summary: Удалить цветок по ID
 *     tags: [Flowers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID цветка
 *     responses:
 *       204:
 *         description: Цветок успешно удален
 *       404:
 *         description: Цветок не найден
 */
app.delete("/api/flowers/:id", (req, res) => {
    const id = Number(req.params.id);
    flowers = flowers.filter(f => f.id !== id);
    res.sendStatus(204);
});

app.listen(5001, () => {
    console.log("Сервер запущен на http://localhost:5001");
});
