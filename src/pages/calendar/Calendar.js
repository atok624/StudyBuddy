// src/pages/calendar/Calendar.js
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PropTypes from 'prop-types';
import "./Calendar.css"

const Calendar = ({ tasks }) => {
  // Convert tasks to events for FullCalendar
  const events = tasks.map(task => ({
    title: task.title,
    start: new Date(task.dueDate),
  }));

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

Calendar.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Calendar;
