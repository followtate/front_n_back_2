const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 1. ПОДКЛЮЧЕНИЕ К MONGODB
// Используем локальный адрес. База 'pawn_shop_nosql' создастся автоматически при первой записи.
const mongoURI = "mongodb://127.0.0.1:27017/pawn_shop_nosql";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Успешно: Подключено к MongoDB (NoSQL)"))
  .catch((err) => {
    console.error("❌ Ошибка: Не удалось подключиться к MongoDB!");
    console.error("Проверь, запущена ли база командой: brew services list");
    process.exit(1);
  });

// 2. ОПРЕДЕЛЕНИЕ СХЕМЫ (Согласно заданию)
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true, // Уникальный идентификатор
  },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number },
  created_at: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000), // Текущий Unix Timestamp
  },
  updated_at: {
    type: Number,
    default: () => Math.floor(Date.now() / 1000),
  },
});

const User = mongoose.model("User", userSchema);

// Функция для получения текущего Unix-времени (в секундах)
const getUnixTime = () => Math.floor(Date.now() / 1000);

// 3. МАРШРУТЫ API (CRUD)

// Создание пользователя (POST /api/users)
app.post("/api/users", async (req, res) => {
  try {
    const user = new User({
      ...req.body,
      created_at: getUnixTime(),
      updated_at: getUnixTime(),
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Получение всех пользователей (GET /api/users)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Получение конкретного пользователя (GET /api/users/:id)
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Обновление пользователя (PATCH /api/users/:id)
app.patch("/api/users/:id", async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      updated_at: getUnixTime(),
    };
    const user = await User.findOneAndUpdate(
      { id: req.params.id },
      updateData,
      { new: true }, // Чтобы вернул обновленный объект
    );
    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Удаление пользователя (DELETE /api/users/:id)
app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ id: req.params.id });
    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" });
    res.json({ message: "Пользователь успешно удален из MongoDB" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. ЗАПУСК СЕРВЕРА
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 СЕРВЕР ЗАПУЩЕН!`);
  console.log(`🔗 Адрес: http://localhost:${PORT}`);
  console.log(`📡 Ожидание запросов...\n`);
});
