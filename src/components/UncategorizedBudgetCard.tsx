import { useBudgets } from '../contexts/BudgetsContext'
import { UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetsContext/const'
import BudgetCard, { BudgetCardProps } from './BudgetCard'

type UncategorizedBudgetCardProps = Omit<BudgetCardProps, 'amount' | 'name' | 'isGray'>

const UncategorizedBudgetCard = (props: UncategorizedBudgetCardProps) => {
  const { getBudgetExpenses } = useBudgets()
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount, 0)

  if (amount === 0) {
    return null
  } else {
    return <BudgetCard {...props} name="Uncategorized" amount={amount} isGray />
  }
}

export default UncategorizedBudgetCard
