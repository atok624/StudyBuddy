// ReminderForm.js

import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ReminderContext } from './ReminderContext';

const ReminderForm = () => {
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');
  const { addReminder } = useContext(ReminderContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs
    if (title.trim() === '' || datetime.trim() === '') return;

    addReminder({ title, datetime });

    setTitle('');
    setDatetime('');
  };

  return (
    <Form onSubmit={handleSubmit}>
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

      <Button variant="primary" type="submit">
        Add Reminder
      </Button>
    </Form>
  );
};

export default ReminderForm;
