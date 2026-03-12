import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { ThemeContext } from "./shared/context/ThemeContext"
import CSSBaseLine from "@mui/material/CssBaseline"
import { TransactionsProvider } from "./shared/context/TransactionsContext" 
import { AuthProvider } from "./shared/context/AuthContext"
import { FinanceProvider } from "./shared/context/FinanceContext"

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ThemeContext>
            <TransactionsProvider>
              <FinanceProvider>
                <CSSBaseLine/>
                <AppRoutes/>
              </FinanceProvider>
            </TransactionsProvider>
          </ThemeContext>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
