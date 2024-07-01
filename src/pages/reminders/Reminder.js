// App.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReminderProvider from './ReminderContext';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';


const App = () => {
  return (
    <ReminderProvider>
      <Container>
        <Row>
          <Col>
            <h1>Walking Buddy - Reminder Manager</h1>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ReminderForm />
          </Col>
          <Col md={6}>
            <ReminderList />
          </Col>
        </Row>
      </Container>
    </ReminderProvider>
  );
};

export default App;
