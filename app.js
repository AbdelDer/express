const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const Task = require('./models/task');

dotenv.config({ path: `.env.local`});

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vrxtnkh.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.get('/api/todos', (req, res, next) => {
  Task.find()
    .then(tasks => res.status(200).json(tasks))
    .catch(error => res.status(400).json({ error }));
});

app.post('/api/add/todo', (req, res, next) => {
  const task = new Task({
    ...req.body
  });
  task.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});


module.exports = app;
