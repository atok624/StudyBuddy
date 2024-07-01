// ReminderProvider.js

import React, { createContext, useState, useEffect } from 'react';
import { ReminderContext } from './ReminderContext';

const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setReminders(storedReminders);
  }, []);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (newReminder) => {
    setReminders([...reminders, { ...newReminder, timesShown: 0 }]);
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const showReminder = (reminder) => {
    // Increment timesShown and update reminders
    const updatedReminders = reminders.map((r) =>
      r.id === reminder.id ? { ...r, timesShown: r.timesShown + 1 } : r
    );
    setReminders(updatedReminders);

    // Show notification here
    showNotification(reminder);

    // Remove reminder after showing it 3 times
    if (reminder.timesShown >= 2) {
      removeReminder(reminder.id);
    }
  };

  const showNotification = (reminder) => {
    if (Notification.permission === 'granted') {
      new Notification(`Reminder: ${reminder.title}`, {
        body: `Time to ${reminder.title}!`,
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showNotification(reminder);
        }
      });
    }
  };

  return (
    <ReminderContext.Provider value={{ reminders, addReminder, removeReminder, showReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};

export default ReminderProvider;
