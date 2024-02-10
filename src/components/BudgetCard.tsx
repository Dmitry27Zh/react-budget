import { Card } from 'react-bootstrap'
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
        <Card.Title>
          <div>{name}</div>
          <div>
            {currencyFormatter.format(amount)} / {currencyFormatter.format(max)}
          </div>
        </Card.Title>
      </Card.Body>
    </Card>
  )
}

export default BudgetCard
