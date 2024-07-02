// src/components/BudgetForm.js
import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ExpenseContext } from './ExpenseContext';
import { Button, Form as BootstrapForm } from 'react-bootstrap';

const BudgetSchema = Yup.object().shape({
  budgetAmount: Yup.number().required('Required').positive('Must be positive'),
});

const BudgetForm = () => {
  const { setBudget } = useContext(ExpenseContext);

  return (
    <Formik
      initialValues={{ budgetAmount: '' }}
      validationSchema={BudgetSchema}
      onSubmit={(values, { resetForm }) => {
        setBudget(values.budgetAmount);
        resetForm();
      }}
    >
      {() => (
        <Form>
          <BootstrapForm.Group>
            <BootstrapForm.Label>Budget Amount</BootstrapForm.Label>
            <Field name="budgetAmount" as={BootstrapForm.Control} type="number" />
            <ErrorMessage name="budgetAmount" component="div" className="error" />
          </BootstrapForm.Group>
          <Button type="submit">Set Budget</Button>
        </Form>
      )}
    </Formik>
  );
};

export default BudgetForm;
