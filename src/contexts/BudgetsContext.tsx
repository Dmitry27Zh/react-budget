import { createContext, useContext } from 'react'

const Context = createContext({})

export const useBudgets = () => {
  return useContext(Context)
}

const BudgetsProvider = ({ children }: React.PropsWithChildren) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>
}

export default BudgetsProvider
