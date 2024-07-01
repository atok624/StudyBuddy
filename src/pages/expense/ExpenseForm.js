// src/components/ExpenseForm.js
import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ExpenseContext } from './ExpenseContext';
import { Button, Form as BootstrapForm } from 'react-bootstrap';

const ExpenseSchema = Yup.object().shape({
  description: Yup.string().required('Required'),
  amount: Yup.number().required('Required').positive('Must be positive'),
  category: Yup.string().required('Required'),
  date: Yup.date().required('Required'),
});

const ExpenseForm = () => {
  const { addExpense } = useContext(ExpenseContext);

  return (
    <Formik
      initialValues={{ description: '', amount: '', category: '', date: '' }}
      validationSchema={ExpenseSchema}
      onSubmit={(values, { resetForm }) => {
        addExpense({ ...values, id: Date.now() });
        resetForm();
      }}
    >
      {() => (
        <Form>
          <BootstrapForm.Group>
            <BootstrapForm.Label>Description</BootstrapForm.Label>
            <Field name="description" as={BootstrapForm.Control} />
            <ErrorMessage name="description" component="div" />
          </BootstrapForm.Group>
          <BootstrapForm.Group>
            <BootstrapForm.Label>Amount</BootstrapForm.Label>
            <Field name="amount" as={BootstrapForm.Control} type="number" />
            <ErrorMessage name="amount" component="div" />
          </BootstrapForm.Group>
          <BootstrapForm.Group>
            <BootstrapForm.Label>Category</BootstrapForm.Label>
            <Field name="category" as={BootstrapForm.Control} component="select">
              <option value="" label="Select category" />
              <option value="Food" label="Food" />
              <option value="Transportation" label="Transportation" />
              <option value="Entertainment" label="Entertainment" />
              <option value="Other" label="Other" />
            </Field>
            <ErrorMessage name="category" component="div" />
          </BootstrapForm.Group>
          <BootstrapForm.Group>
            <BootstrapForm.Label>Date</BootstrapForm.Label>
            <Field name="date" as={BootstrapForm.Control} type="date" />
            <ErrorMessage name="date" component="div" />
          </BootstrapForm.Group>
          <Button type="submit">Add Expense</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ExpenseForm;
