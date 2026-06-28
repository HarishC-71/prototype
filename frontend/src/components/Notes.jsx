import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get('/note');
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/note/${editingId}`, { title, content });
      } else {
        await api.post('/note', { title, content });
      }
      setTitle('');
      setContent('');
      setEditingId(null);
      fetchNotes();
    } catch (error) {
      console.error("Error saving note", error);
    }
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id || note.id);
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/note/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  return (
    <div>
      <h2 className="mb-2">My Notes</h2>
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
            />
          </div>
          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea 
              className="form-input" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="4"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Update Note' : 'Add Note'}
          </button>
          {editingId && (
            <button 
              type="button" 
              className="btn btn-danger ml-2" 
              style={{marginLeft: '10px'}}
              onClick={() => {
                setEditingId(null);
                setTitle('');
                setContent('');
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="grid mt-3">
        {notes.map(note => (
          <div key={note._id || note.id} className="glass card">
            <div>
              <h3 className="card-title">{note.title}</h3>
              <p className="card-body">{note.content}</p>
            </div>
            <div className="card-actions">
              <button onClick={() => editNote(note)} className="btn btn-sm btn-primary">Edit</button>
              <button onClick={() => deleteNote(note._id || note.id)} className="btn btn-sm btn-danger">Delete</button>
            </div>
          </div>
        ))}
        {notes.length === 0 && <p style={{color: 'var(--text-secondary)'}}>No notes yet. Create one!</p>}
      </div>
    </div>
  );
};

export default Notes;
