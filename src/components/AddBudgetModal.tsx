import { Form, Modal, Button } from 'react-bootstrap'

const AddBudgetModal = () => {
  const handleClose = () => {}

  return (
    <Modal show onHide={handleClose}>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control type="number" required min={0} step={0.01} />
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
