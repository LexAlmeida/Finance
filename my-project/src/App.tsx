import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { ThemeContext } from "./shared/context/ThemeContext"
import CSSBaseLine from "@mui/material/CssBaseline"
import { TransactionsProvider } from "./shared/hooks/TransactionsContext" 

function App() {

  return (
    <>
      <BrowserRouter>
        <ThemeContext>
          <TransactionsProvider>
            <CSSBaseLine/>
            <AppRoutes/>
          </TransactionsProvider>
        </ThemeContext>
      </BrowserRouter>
    </>
  )
}

export default App
