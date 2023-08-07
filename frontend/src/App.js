import { BrowserRouter } from "react-router-dom"
import { LocaleContextProvider } from "./context/localeContext"
import AppRoutes from "./AppRoutes"
import "#styles/main.scss"

const App = () => {
  return (
    <BrowserRouter>
      <LocaleContextProvider>
        <AppRoutes />
      </LocaleContextProvider>
    </BrowserRouter>
  )
}

export default App
