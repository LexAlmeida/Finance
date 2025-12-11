import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { ThemeContext } from "./shared/context/ThemeContext"
import CSSBaseLine from "@mui/material/CssBaseline" 

function App() {

  return (
    <>
      <BrowserRouter>
        <ThemeContext>
          <CSSBaseLine/>
          <AppRoutes/>
        </ThemeContext>
      </BrowserRouter>
    </>
  )
}

export default App
