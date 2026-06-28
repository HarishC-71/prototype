import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get('/todo');
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/todo/${editingId}`, { title });
      } else {
        await api.post('/todo', { title, completed: false });
      }
      setTitle('');
      setEditingId(null);
      fetchTodos();
    } catch (error) {
      console.error("Error saving task", error);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await api.put(`/todo/${todo._id || todo.id}`, { completed: !todo.completed });
      fetchTodos();
    } catch (error) {
      console.error("Error toggling task", error);
    }
  };

  const editTodo = (todo) => {
    setTitle(todo.title);
    setEditingId(todo._id || todo.id);
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todo/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div>
      <h2 className="mb-2">My Tasks</h2>
      <div className="glass form-block" style={{ padding: '1rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div style={{ flexGrow: 1 }}>
            <input 
              type="text" 
              className="form-input" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
              placeholder="What needs to be done?"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
            {editingId ? 'Update' : 'Add Task'}
          </button>
          {editingId && (
            <button 
              type="button" 
              className="btn btn-danger" 
              style={{ width: 'auto' }}
              onClick={() => {
                setEditingId(null);
                setTitle('');
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="list-container glass" style={{ padding: '1rem' }}>
        {todos.map(todo => (
          <div key={todo._id || todo.id} className={`list-item ${todo.completed ? 'completed' : ''}`} style={{ borderBottom: '1px solid var(--card-border)' }}>
            <div className="item-content">
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => toggleComplete(todo)} 
              />
              <span className="item-text">{todo.title}</span>
            </div>
            <div className="card-actions" style={{ marginTop: 0 }}>
              <button onClick={() => editTodo(todo)} className="btn btn-sm btn-primary">Edit</button>
              <button onClick={() => deleteTodo(todo._id || todo.id)} className="btn btn-sm btn-danger">Delete</button>
            </div>
          </div>
        ))}
        {todos.length === 0 && <p style={{color: 'var(--text-secondary)', padding: '1rem'}}>No tasks yet.</p>}
      </div>
    </div>
  );
};

export default Todo;
