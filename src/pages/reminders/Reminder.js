import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReminderProvider from "./ReminderContext";
import ReminderForm from "./ReminderForm";
import ReminderList from "./ReminderList";
import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";

const Reminder = () => {
  return (
    <div className="App">
      <Sidebar />
      <div className="main--content">
        <Header />
        <ReminderProvider>
          <Container>
            <Row>
              <Col>
                <h3>Reminder Manager</h3>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <ReminderForm />
              </Col>
              <Col md={4}>
                <ReminderList />
              </Col>
            </Row>
          </Container>
        </ReminderProvider>
      </div>
    </div>
  );
};

export default Reminder;
