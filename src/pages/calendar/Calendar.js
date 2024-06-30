import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import "./Calendar.css";
import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";

const Calendar = ({ tasks }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({});

  const events = tasks.map((task) => ({
    title: task.title,
    start: new Date(task.dueDate),
    description: task.description,
    classNames: task.type, // Add class for custom styling
  }));

  const handleEventClick = (clickInfo) => {
    setModalContent({
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps.description,
    });
    setShowModal(true);
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Enter a title for the new event");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="main--content">
        <Header />
        <div className="calendar-layout">
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                start: "title",
                center: "dayGridMonth,timeGridWeek,timeGridDay",
                end: "today prev,next",
              }}
              events={events}
              height="70vh"
              eventClick={handleEventClick}
              selectable={true}
              select={handleDateSelect}
              locale="en"
              timeZone="local"
            />
          </div>
          <div className="event-list">
            <h2>Event List</h2>
            <div className="event-cards">
              {tasks.map((task) => (
                <div className="event-card" key={task.id}>
                  <strong>{task.title}</strong> -{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                  <p>{task.description}</p>
                </div>
              ))}
            </div>
          </div>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{modalContent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalContent.description}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Calendar;
