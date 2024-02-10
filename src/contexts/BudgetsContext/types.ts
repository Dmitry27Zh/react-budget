import { Budget, Expense, Id, NewBudget, NewExpense } from '../../model/data'

export type ContextType = {
  budgets: Budget[]
  expenses: Expense[]
  getBudgetExpenses: (id: Id) => Expense[]
  addBudget: (newBudget: NewBudget) => void
  addExpense: (newExpense: NewExpense) => void
  deleteBudget: (id: Id) => void
  deleteExpense: (id: Id) => void
}
