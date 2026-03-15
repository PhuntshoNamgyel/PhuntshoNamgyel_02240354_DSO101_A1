import { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch(`${API_URL}/todos`);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    });
    setTask('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditTask(todo.task);
  };

  const saveEdit = async (id) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: editTask, completed: false }),
    });
    setEditId(null);
    fetchTodos();
  };

  const toggleComplete = async (todo) => {
    await fetch(`${API_URL}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: todo.task, completed: !todo.completed }),
    });
    fetchTodos();
  };

  return (
    <div className="container">
      <h1>📝 Todo App</h1>
      <div className="input-row">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {editId === todo.id ? (
              <>
                <input
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleComplete(todo)}>{todo.task}</span>
                <div className="actions">
                  <button onClick={() => startEdit(todo)}>✏️</button>
                  <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;