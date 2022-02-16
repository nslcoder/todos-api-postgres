require('dotenv').config();
const express = require('express');
const queryCall = require('./db/query');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.get('/todos', async (req, res) => {
  try {
    const query = 'SELECT * FROM todos';
    const allTodos = await queryCall(query, null);
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err);
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { task, done } = req.body;
    const query = 'INSERT INTO todos(task, done) VALUES($1, $2) RETURNING *';
    const params = [task, done];
    const newTodo = await queryCall(query, params);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { task, done } = req.body;
    const query = 'UPDATE todos SET task=$1, done=$2 WHERE id=$3';
    const params = [task, done, id];
    await queryCall(query, params);
    res.json('Todo was updated.');
  } catch (err) {
    console.log(err);
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM todos WHERE id=$1';
    const params = [id];
    await queryCall(query, params);
    res.json('A row was deleted.');
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`The server is listening at port ${port}.`);
});
