import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Notes from '../components/Notes';
import Todo from '../components/Todo';
import Expenses from '../components/Expenses';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("notes");

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      <Navbar />
      
      <div className="container">
        <div className="nav-tabs">
          <button 
            className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
          <button 
            className={`tab-btn ${activeTab === 'todo' ? 'active' : ''}`}
            onClick={() => setActiveTab('todo')}
          >
            Todo
          </button>
          <button 
            className={`tab-btn ${activeTab === 'expenses' ? 'active' : ''}`}
            onClick={() => setActiveTab('expenses')}
          >
            Expenses
          </button>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          {activeTab === "notes" && <Notes />}
          {activeTab === "todo" && <Todo />}
          {activeTab === "expenses" && <Expenses />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
