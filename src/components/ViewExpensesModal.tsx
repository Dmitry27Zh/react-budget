import { Modal, Button, Stack } from 'react-bootstrap'
import { useBudgets } from '../contexts/BudgetsContext'
import { Id } from '../model/data'
import { UNCATEGORIZED_BUDGET } from '../contexts/BudgetsContext/const'
import { currencyFormatter } from '../utils'

type ViewExpensesModalProps = {
  show: boolean
  handleClose: () => void
  budgetId?: Id
}

const ViewExpensesModal = ({ budgetId = UNCATEGORIZED_BUDGET.id, show, handleClose }: ViewExpensesModalProps) => {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
  const budget = budgetId === UNCATEGORIZED_BUDGET.id ? UNCATEGORIZED_BUDGET : budgets.find((b) => b.id === budgetId)
  const mayDelete = budgetId !== UNCATEGORIZED_BUDGET.id
  const expenses = getBudgetExpenses(budgetId)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Expenses - {budget?.name}</div>
            {mayDelete && (
              <Button
                onClick={() => {
                  deleteBudget(budgetId)
                  handleClose()
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap={3}>
          {expenses.map((expense) => (
            <Stack key={expense.id} direction="horizontal" gap={2}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
              <Button onClick={() => deleteExpense(expense.id)} size="sm" variant="outline-danger">
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default ViewExpensesModal
