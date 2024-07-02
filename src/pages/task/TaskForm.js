import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Please fill in all required fields.');
      return;
    }
    addTask({ title, description, priority, dueDate, category, notes, reminder });
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
    setCategory('');
    setNotes('');
    setReminder(false);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <label>Title*</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div>
        <label>Due Date*</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      </div>
      <div>
        <label className='set--reminder'>Set Reminder</label>
        <input type="checkbox" checked={reminder} onChange={(e) => setReminder(e.target.checked)} />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
