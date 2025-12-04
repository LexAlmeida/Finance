import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { ThemeContext } from "./shared/context/ThemeContext"

function App() {

  return (
    <>
      <BrowserRouter>
        <ThemeContext>
          <AppRoutes/>
        </ThemeContext>
      </BrowserRouter>
    </>
  )
}

export default App
