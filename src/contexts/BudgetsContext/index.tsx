import { createContext, useContext } from 'react'
import { Budget, Expense } from '../../model/data'
import { v4 as uuidV4 } from 'uuid'
import useLocaleStorage from '../../hooks/useLocalStorage'
import { ContextType } from './types'
import { UNCATEGORIZED_BUDGET } from './const'

const Context = createContext({} as ContextType)

export const useBudgets = () => {
  return useContext(Context)
}

const BudgetsProvider = ({ children }: React.PropsWithChildren) => {
  const [budgets, setBudgets] = useLocaleStorage<Budget[]>('budgets', [])
  const [expenses, setExpenses] = useLocaleStorage<Expense[]>('expenses', [])
  const getBudgetExpenses: ContextType['getBudgetExpenses'] = (id) => {
    return expenses.filter((expense) => expense.budgetId === id)
  }
  const addExpense: ContextType['addExpense'] = (newExpense) => {
    setExpenses((prevState) => {
      return [...prevState, { ...newExpense, id: uuidV4() }]
    })
  }
  const addBudget: ContextType['addBudget'] = (newBudget) => {
    setBudgets((prevState) => {
      const isExist = budgets.some((budget) => budget.name === newBudget.name)
      if (isExist) {
        return prevState
      } else {
        return [...prevState, { ...newBudget, id: uuidV4() }]
      }
    })
  }
  const deleteBudget: ContextType['deleteBudget'] = (id) => {
    setBudgets((prevState) => prevState.filter((budget) => budget.id !== id))
    setExpenses((prevState) => {
      return prevState.map((expense) => {
        if (expense.budgetId === id) {
          return { ...expense, budgetId: UNCATEGORIZED_BUDGET.id }
        } else {
          return expense
        }
      })
    })
  }
  const deleteExpense: ContextType['deleteExpense'] = (id) => {
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
