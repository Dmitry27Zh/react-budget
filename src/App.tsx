import { Button, Container, Stack } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModal'
import { useState } from 'react'
import { useBudgets } from './contexts/BudgetsContext'

function App() {
  const { budgets, getBudgetExpenses } = useBudgets()
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)

  return (
    <>
      <Container className="my-4">
        <Stack className="mb-4" direction="horizontal" gap={2}>
          <h1 className="me-auto">Budgets</h1>
          <Button variant="outline-primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary">Add Expense</Button>
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

            return <BudgetCard key={budget.id} name={budget.name} isGray={false} amount={amount} max={budget.max} />
          })}
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => {}} />
    </>
  )
}

export default App
