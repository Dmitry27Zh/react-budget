import { useBudgets } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'

const TotalBudgetCard = () => {
  const { expenses, budgets } = useBudgets()
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const max = budgets.reduce((total, budget) => total + budget.max, 0)

  if (max === 0) {
    return null
  } else {
    return <BudgetCard name="Total" amount={amount} max={max} isGray hideButtons={true} />
  }
}

export default TotalBudgetCard
