import { Modal, Button, Stack } from 'react-bootstrap'
import { useBudgets } from '../contexts/BudgetsContext'
import { Id } from '../model/data'
import { UNCATEGORIZED_BUDGET } from '../contexts/BudgetsContext/const'

type ViewExpensesModalProps = {
  show: boolean
  handleClose: () => void
  budgetId?: Id
}

const ViewExpensesModal = ({ budgetId = UNCATEGORIZED_BUDGET.id, show, handleClose }: ViewExpensesModalProps) => {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()
  const budget = budgetId === UNCATEGORIZED_BUDGET.id ? UNCATEGORIZED_BUDGET : budgets.find((b) => b.id === budgetId)
  const mayDelete = budgetId !== UNCATEGORIZED_BUDGET.id

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
      <Modal.Body></Modal.Body>
    </Modal>
  )
}

export default ViewExpensesModal
