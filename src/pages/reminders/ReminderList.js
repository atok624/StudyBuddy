import React, { useContext } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { ReminderContext } from './ReminderContext';

const ReminderList = () => {
  const { reminders, removeReminder } = useContext(ReminderContext);

  const handleDelete = (id) => {
    removeReminder(id);
  };

  return (
    <ListGroup>
      {reminders.map((reminder) => (
        <ListGroup.Item key={reminder.id}>
          <div>{reminder.title}</div>
          <div>{reminder.datetime}</div>
          <Button variant="danger" onClick={() => handleDelete(reminder.id)}>
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ReminderList;
