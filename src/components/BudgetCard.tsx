import { Card, ProgressBar, Stack, Button } from 'react-bootstrap'
import { currencyFormatter } from '../utils'

type BudgetCardProps = {
  name: string
  amount: number
  max: number
}

const BudgetCard = ({ name, amount, max }: BudgetCardProps) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(max)}</span>
          </div>
        </Card.Title>
        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />
        <Stack className="mt-4" direction="horizontal" gap={2}>
          <Button className="ms-auto" variant="outline-primary">
            Add Expense
          </Button>
          <Button variant="outline-secondary">View Expenses</Button>
        </Stack>
      </Card.Body>
    </Card>
  )
}

function getProgressBarVariant(amount: number, max: number) {
  const ratio = amount / max

  if (ratio < 0.5) {
    return 'primary'
  } else if (ratio < 0.75) {
    return 'warning'
  } else {
    return 'danger'
  }
}

export default BudgetCard
