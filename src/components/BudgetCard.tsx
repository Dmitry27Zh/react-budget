import { Card, ProgressBar, Stack, Button } from 'react-bootstrap'
import { currencyFormatter } from '../utils'

export type BudgetCardProps = {
  name: string
  amount: number
  max?: number
  isGray: boolean
  onAddExpenseClick?: () => void
  hideButtons?: boolean
}

const BudgetCard = ({ name, amount, max, isGray, onAddExpenseClick, hideButtons }: BudgetCardProps) => {
  const classNames = []
  const isDanger = max && amount > max
  if (isDanger) {
    classNames.push('bg-danger', 'bg-opacity-10')
  } else if (isGray) {
    classNames.push('bg-light')
  }

  return (
    <Card className={classNames.join(' ')}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && <span className="text-muted fs-6 ms-1">/ {currencyFormatter.format(max)}</span>}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack className="mt-4" direction="horizontal" gap={2}>
            <Button className="ms-auto" variant="outline-primary" onClick={onAddExpenseClick}>
              Add Expense
            </Button>
            <Button variant="outline-secondary">View Expenses</Button>
          </Stack>
        )}
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
