import React, { useContext, useState } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import { ReminderContext } from './ReminderContext';
import './ReminderList.css';

const ReminderList = () => {
  const { reminders, removeReminder } = useContext(ReminderContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [reminderToDelete, setReminderToDelete] = useState(null);

  const handleDelete = (id) => {
    removeReminder(id);
    setShowConfirm(false);
  };

  const handleShowConfirm = (id) => {
    setReminderToDelete(id);
    setShowConfirm(true);
  };

  return (
    <>
      <ListGroup className='reminder--container'>
        {reminders.map((reminder) => (
          <ListGroup.Item key={reminder.id} className="reminder-item">
            <div className="reminder-content">
              <h5>{reminder.title}</h5>
              <div><strong>Date & Time:</strong> {reminder.datetime}</div>
              <div><strong>Description:</strong> {reminder.description}</div>
              <div><strong>Priority:</strong> {reminder.priority}</div>
            </div>
            <div className="reminder-actions">
              <Button variant="primary" onClick={() => handleShowConfirm(reminder.id)}>
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this reminder?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(reminderToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReminderList;
