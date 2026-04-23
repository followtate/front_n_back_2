const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());


const sequelize = new Sequelize('my_practicum_db', '', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER
  },
  created_at: {
    type: DataTypes.BIGINT, 
    allowNull: false
  },
  updated_at: {
    type: DataTypes.BIGINT,
    allowNull: false
  }
}, {
  timestamps: false 
});


const getUnixTime = () => Math.floor(Date.now() / 1000);



app.post('/api/users', async (req, res) => {
  try {
    const { first_name, last_name, age } = req.body;
    const now = getUnixTime();
    const user = await User.create({
      first_name,
      last_name,
      age,
      created_at: now,
      updated_at: now
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});


app.get('/api/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ message: 'User not found' });
});


app.patch('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const updateData = { ...req.body, updated_at: getUnixTime() };
    await user.update(updateData);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.delete('/api/users/:id', async (req, res) => {
  const deleted = await User.destroy({ where: { id: req.params.id } });
  if (deleted) res.json({ message: 'User deleted' });
  else res.status(404).json({ message: 'User not found' });
});


const PORT = 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
  });
});