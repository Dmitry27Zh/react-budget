import { createContext, useContext, useState } from 'react'
import { Budget, Expense, Id, NewBudget, NewExpense } from '../model/data'
import { v4 as uuidV4 } from 'uuid'

const Context = createContext({})

export const useBudgets = () => {
  return useContext(Context)
}

const BudgetsProvider = ({ children }: React.PropsWithChildren) => {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const getBudgetExpenses = (id: Id) => {
    return expenses.filter((expense) => expense.budgetId === id)
  }
  const addExpense = (newExpense: NewExpense) => {
    setExpenses((prevState) => {
      return [...prevState, { ...newExpense, id: uuidV4() }]
    })
  }
  const addBudget = (newBudget: NewBudget) => {
    setBudgets((prevState) => {
      const isExist = budgets.some((budget) => budget.name === newBudget.name)
      if (isExist) {
        return prevState
      } else {
        return [...prevState, { ...newBudget, id: uuidV4() }]
      }
    })
  }
  const deleteBudget = (id: Id) => {
    setBudgets((prevState) => prevState.filter((budget) => budget.id !== id))
  }
  const deleteExpense = (id: Id) => {
    setExpenses((prevState) => prevState.filter((expense) => expense.id !== id))
  }

  return (
    <Context.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default BudgetsProvider
