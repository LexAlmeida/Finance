import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { ThemeContext } from "./shared/context/ThemeContext"
import CSSBaseLine from "@mui/material/CssBaseline" 
import { Header } from "./shared/components/Header/Header"

function App() {

  return (
    <>
      <BrowserRouter>
        <ThemeContext>
          <CSSBaseLine/>
          
            <Header/>
          <AppRoutes/>
        </ThemeContext>
      </BrowserRouter>
    </>
  )
}

export default App
