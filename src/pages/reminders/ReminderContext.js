import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ReminderContext = createContext();

const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState(
    JSON.parse(localStorage.getItem('reminders')) || []
  );

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const checkReminders = useCallback(() => {
    const currentTime = new Date().getTime();
    reminders.forEach((reminder) => {
      const reminderTime = new Date(reminder.datetime).getTime();
      if (currentTime >= reminderTime) {
        showNotification(reminder);
        removeReminder(reminder.id);
      }
    });
  }, [reminders]);

  useEffect(() => {
    const checkRemindersInterval = setInterval(() => {
      checkReminders();
    }, 60000); // Check every minute

    return () => clearInterval(checkRemindersInterval);
  }, [checkReminders]);

  const addReminder = (reminder) => {
    setReminders(prevReminders => [
      ...prevReminders, 
      { ...reminder, id: prevReminders.length ? prevReminders[prevReminders.length - 1].id + 1 : 1 }
    ]);
  };

  const removeReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
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
