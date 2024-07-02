import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ReminderContext } from './ReminderContext';
import './ReminderForm.css';

const ReminderForm = () => {
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [error, setError] = useState('');
  const { addReminder } = useContext(ReminderContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs
    if (title.trim() === '' || datetime.trim() === '') {
      setError('Title and Date & Time are required.');
      return;
    }

    if (new Date(datetime) < new Date()) {
      setError('Date & Time cannot be in the past.');
      return;
    }

    addReminder({ title, datetime, description, priority });

    setTitle('');
    setDatetime('');
    setDescription('');
    setPriority('Normal');
    setError('');
  };

  return (
    <Form onSubmit={handleSubmit} className="reminder-form">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter title" 
        />
      </Form.Group>

      <Form.Group controlId="datetime">
        <Form.Label>Date & Time</Form.Label>
        <Form.Control 
          type="datetime-local" 
          value={datetime} 
          onChange={(e) => setDatetime(e.target.value)} 
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Enter description" 
        />
      </Form.Group>

      <Form.Group controlId="priority">
        <Form.Label>Priority</Form.Label>
        <Form.Control 
          as="select" 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)} 
        >
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Reminder
      </Button>
    </Form>
  );
};

export default ReminderForm;
