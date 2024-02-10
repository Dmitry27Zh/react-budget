import { FormEventHandler, useRef } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { useBudgets } from '../contexts/BudgetsContext'

type AddBudgetModalProps = {
  show: boolean
  handleClose: () => void
}

const AddBudgetModal = ({ show, handleClose }: AddBudgetModalProps) => {
  const { addBudget } = useBudgets()
  const nameRef = useRef<HTMLInputElement>(null)
  const maxRef = useRef<HTMLInputElement>(null)
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    const name = nameRef.current?.value
    const max = parseFloat(maxRef.current?.value ?? '')
    if (name && max) {
      addBudget({ name, max })
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control ref={maxRef} type="number" required min={0} step={0.01} />
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

export default AddBudgetModal
