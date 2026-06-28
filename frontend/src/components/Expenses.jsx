import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expense');
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = { title, amount: Number(amount) };
      if (editingId) {
        await api.put(`/expense/${editingId}`, expenseData);
      } else {
        await api.post('/expense', expenseData);
      }
      setTitle('');
      setAmount('');
      setEditingId(null);
      fetchExpenses();
    } catch (error) {
      console.error("Error saving expense", error);
    }
  };

  const editExpense = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setEditingId(expense._id || expense.id);
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expense/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  const totalExpenses = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <div>
      <h2 className="mb-2">My Expenses</h2>
      
      <div className="glass stat-card">
        <h3 style={{ color: 'var(--text-secondary)' }}>Total Expenses</h3>
        <div className="stat-value">${totalExpenses.toFixed(2)}</div>
      </div>

      <div className="glass form-block">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              className="form-input" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
              placeholder="Groceries"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Amount</label>
            <input 
              type="number" 
              step="0.01"
              className="form-input" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required 
              placeholder="0.00"
            />
          </div>
          <div className="flex-row">
            <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
              {editingId ? 'Update Expense' : 'Add Expense'}
            </button>
            {editingId && (
              <button 
                type="button" 
                className="btn btn-danger" 
                style={{ width: 'auto' }}
                onClick={() => {
                  setEditingId(null);
                  setTitle('');
                  setAmount('');
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="list-container glass" style={{ padding: '1rem' }}>
        {expenses.map(expense => (
          <div key={expense._id || expense.id} className="list-item" style={{ borderBottom: '1px solid var(--card-border)' }}>
            <div className="expense-info">
              <span className="expense-title">{expense.title}</span>
              <span className="expense-meta">
                {expense.createdAt ? new Date(expense.createdAt).toLocaleDateString() : 'Just now'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span className="expense-amount">${Number(expense.amount).toFixed(2)}</span>
              <div className="card-actions" style={{ marginTop: 0 }}>
                <button onClick={() => editExpense(expense)} className="btn btn-sm btn-primary">Edit</button>
                <button onClick={() => deleteExpense(expense._id || expense.id)} className="btn btn-sm btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {expenses.length === 0 && <p style={{color: 'var(--text-secondary)', padding: '1rem'}}>No expenses tracked yet.</p>}
      </div>
    </div>
  );
};

export default Expenses;
