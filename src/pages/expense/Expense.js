import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./AddBudgetModal";
import AddExpenseModal from "./AddExpenseModal";
import ViewExpensesModal from "./ViewExpensesModal";
import BudgetCard from "./BudgetCard";
import UncategorizedBudgetCard from "./UncategorizedBudgetCard";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./BudgetsContext";
import TotalBudgetCard from "./TotalBudgetCard";
import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";

function Expense() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <div className="App">
        <Sidebar />
        <div className="main--content">
          <Header />
          <div className="card--container">
            <Container className="my-4">
              <Stack direction="d-flex just-content-between" gap="2" className="mb-4">
                <h1 className="me-auto">Budgets</h1>
                <TotalBudgetCard />
                <Button
                  variant="primary"
                  onClick={() => setShowAddBudgetModal(true)}
                >
                  Add Budget
                </Button>
                <Button variant="outline-primary" onClick={openAddExpenseModal}>
                  Add Expense
                </Button>
              </Stack>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                {budgets.map((budget) => {
                  const amount = getBudgetExpenses(budget.id).reduce(
                    (total, expense) => total + expense.amount,
                    0
                  );
                  return (
                    <BudgetCard
                      key={budget.id}
                      name={budget.name}
                      amount={amount}
                      max={budget.max}
                      onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                      onViewExpensesClick={() =>
                        setViewExpensesModalBudgetId(budget.id)
                      }
                    />
                  );
                })}
                <UncategorizedBudgetCard
                  onAddExpenseClick={openAddExpenseModal}
                  onViewExpensesClick={() =>
                    setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
                  }
                />
              </div>
            </Container>
            <AddBudgetModal
              show={showAddBudgetModal}
              handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal
              show={showAddExpenseModal}
              defaultBudgetId={addExpenseModalBudgetId}
              handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpensesModal
              budgetId={viewExpensesModalBudgetId}
              handleClose={() => setViewExpensesModalBudgetId()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Expense;
