import { Card } from 'react-bootstrap'

type BudgetCardProps = {
  name: string
  amount: number
  max: number
}

const BudgetCard = ({ name, amount, max }: BudgetCardProps) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <div>{name}</div>
          <div>
            {amount} / {max}
          </div>
        </Card.Title>
      </Card.Body>
    </Card>
  )
}

export default BudgetCard
