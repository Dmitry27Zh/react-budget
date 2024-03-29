import { useState } from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModal'
import AddExpenseModal from './components/AddExpenseModal'
import ViewExpensesModal from './components/ViewExpensesModal'
import { useBudgets } from './contexts/BudgetsContext'
import { Id } from './model/data'
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'
import TotalBudgetCard from './components/TotalBudgetCard'

function App() {
  const { budgets, getBudgetExpenses } = useBudgets()
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState<Id>()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState<Id>()
  const openAddExpenseModal = (budgetId?: Id) => {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  const openViewExpensesModal = (budgetId?: Id) => {
    setShowViewExpensesModal(true)
    setViewExpensesModalBudgetId(budgetId)
  }
  const handleViewExpensesModalClose = () => {
    setShowViewExpensesModal(false)
    setViewExpensesModalBudgetId(undefined)
  }

  return (
    <>
      <Container className="my-4">
        <Stack className="mb-4" direction="horizontal" gap={2}>
          <h1 className="me-auto">Budgets</h1>
          <Button variant="outline-primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={() => openAddExpenseModal()}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)

            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                isGray={false}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => openViewExpensesModal(budget.id)}
              />
            )
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={() => openAddExpenseModal()}
            onViewExpensesClick={() => openViewExpensesModal()}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        show={showViewExpensesModal}
        handleClose={handleViewExpensesModalClose}
      />
    </>
  )
}

export default App
