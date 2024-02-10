import { Button, Container, Stack } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'

function App() {
  return (
    <Container className="my-4">
      <Stack className="mb-4" direction="horizontal" gap={2}>
        <h1 className="me-auto">Budgets</h1>
        <Button variant="outline-primary">Add Budget</Button>
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
        <BudgetCard name="Entertainment" isGray={false} amount={200} max={1000} />
        <BudgetCard name="Entertainment" isGray={true} amount={200} max={1000} />
        <BudgetCard name="Entertainment" isGray={true} amount={1001} max={1000} />
      </div>
    </Container>
  )
}

export default App
