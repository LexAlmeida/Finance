import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { ThemeContext } from "./shared/context/ThemeContext"
import CSSBaseLine from "@mui/material/CssBaseline"
import { TransactionsProvider } from "./shared/hooks/TransactionsContext" 
import { AuthProvider } from "./shared/context/AuthContext"

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ThemeContext>
            <TransactionsProvider>
              <CSSBaseLine/>
              <AppRoutes/>
            </TransactionsProvider>
          </ThemeContext>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
