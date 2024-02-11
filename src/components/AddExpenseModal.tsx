import { FormEventHandler, useRef } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { useBudgets } from '../contexts/BudgetsContext'
import { Id } from '../model/data'
import { UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetsContext/const'

type AddExpenseModalProps = {
  show: boolean
  handleClose: () => void
  defaultBudgetId?: Id
}

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }: AddExpenseModalProps) => {
  const { addExpense, budgets } = useBudgets()
  const descriptionRef = useRef<HTMLInputElement>(null)
  const amountRef = useRef<HTMLInputElement>(null)
  const budgetRef = useRef<HTMLSelectElement>(null)
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    const description = descriptionRef.current?.value
    const amount = parseFloat(amountRef.current?.value ?? '')
    const budgetId = budgetRef.current?.value
    if (description && amount && budgetId) {
      addExpense({ description, amount, budgetId })
      handleClose()
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control ref={amountRef} type="number" required min={0} step={0.01} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select ref={budgetRef} defaultValue={defaultBudgetId}>
              <option value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}

export default AddExpenseModal
