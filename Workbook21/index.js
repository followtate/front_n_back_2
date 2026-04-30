const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createClient } = require("redis");

const app = express();
app.use(express.json());

const PORT = 3000;
const ACCESS_SECRET = "access_secret";
const REFRESH_SECRET = "refresh_secret";
const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

const USERS_CACHE_TTL = 60;
const PRODUCTS_CACHE_TTL = 600;

const users = [];
const products = [
  { id: "1", name: "Laptop", price: 1000, description: "Workstation" },
  { id: "2", name: "Phone", price: 500, description: "Smartphone" },
];
const refreshTokens = new Set();

const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => console.error("Redis error:", err));

async function initRedis() {
  await redisClient.connect();
  console.log("Redis connected successfully");
}

// Вспомогательные функции токенов
function generateAccessToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username, role: user.role },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES_IN },
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username, role: user.role },
    REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES_IN },
  );
}

// Middleware
function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token)
    return res.status(401).json({ error: "Unauthorized" });
  try {
    const payload = jwt.verify(token, ACCESS_SECRET);
    const user = users.find((u) => u.id === payload.sub);
    if (!user || user.blocked)
      return res.status(401).json({ error: "User blocked or not found" });
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role))
      return res.status(403).json({ error: "Forbidden" });
    next();
  };
}

// Логика кэширования
function cacheMiddleware(keyBuilder, ttl) {
  return async (req, res, next) => {
    try {
      const key = keyBuilder(req);
      const cachedData = await redisClient.get(key);
      if (cachedData) {
        return res.json({ source: "cache", data: JSON.parse(cachedData) });
      }
      req.cacheKey = key;
      req.cacheTTL = ttl;
      next();
    } catch (err) {
      next();
    }
  };
}

async function saveToCache(key, data, ttl) {
  try {
    await redisClient.set(key, JSON.stringify(data), { EX: ttl });
  } catch (err) {
    console.error("Cache save error:", err);
  }
}

async function invalidateUsersCache(userId = null) {
  await redisClient.del("users:all");
  if (userId) await redisClient.del(`users:${userId}`);
}

// Роуты
app.post("/api/auth/register", async (req, res) => {
  const { username, password, role } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: String(users.length + 1),
    username,
    passwordHash,
    role: role || "user",
    blocked: false,
  };
  users.push(user);
  res.status(201).json({ id: user.id, username });
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.add(refreshToken);
    return res.json({ accessToken, refreshToken });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

app.get(
  "/api/users",
  authMiddleware,
  roleMiddleware(["admin"]),
  cacheMiddleware(() => "users:all", USERS_CACHE_TTL),
  async (req, res) => {
    const data = users.map((u) => ({
      id: u.id,
      username: u.username,
      role: u.role,
    }));
    await saveToCache(req.cacheKey, data, req.cacheTTL);
    res.json({ source: "server", data });
  },
);

app.get(
  "/api/products",
  authMiddleware,
  cacheMiddleware(() => "products:all", PRODUCTS_CACHE_TTL),
  async (req, res) => {
    await saveToCache(req.cacheKey, products, req.cacheTTL);
    res.json({ source: "server", data: products });
  },
);

// Запуск
initRedis().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  );
});
