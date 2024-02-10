export type Id = string

export type Budget = {
  id: Id
  name: string
  max: number
}

export type Expense = {
  id: Id
  budgetId: Id
  amount: number
  description: string
}

export type NewBudget = Omit<Budget, 'id'>

export type NewExpense = Omit<Expense, 'id'>
