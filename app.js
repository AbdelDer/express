const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.get('/api/todos', (req, res, next) => {
  const tasks = [
    {
      _id: '1',
      title: 'tache 1',
      description: 'description de la tache 1'
    },
  ];
  res.status(200).json(tasks);
});

app.post('/api/add/todo', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'tache ajoutee'
  });
});


module.exports = app;
