// ReminderProvider.js

import React, { createContext, useState, useEffect } from 'react';

export const ReminderContext = createContext();

const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState(
    JSON.parse(localStorage.getItem('reminders')) || []
  );

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    const checkRemindersInterval = setInterval(() => {
      checkReminders();
    }, 60000); // Check every minute

    return () => clearInterval(checkRemindersInterval);
  }, []);

  const addReminder = (reminder) => {
    setReminders([...reminders, { ...reminder, id: reminders.length + 1 }]);
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const checkReminders = () => {
    const currentTime = new Date().getTime();

    reminders.forEach((reminder) => {
      const reminderTime = new Date(reminder.datetime).getTime();

      if (currentTime >= reminderTime) {
        showNotification(reminder);
        removeReminder(reminder.id);
      }
    });
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
    <ReminderContext.Provider value={{ reminders, addReminder, removeReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};

export default ReminderProvider;