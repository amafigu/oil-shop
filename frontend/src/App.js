import "#styles/main.scss"
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import { CartProvider } from "./context/cartContext"
import { LocaleContextProvider } from "./context/localeContext"

const App = () => {
  return (
    <BrowserRouter>
      <LocaleContextProvider>
      <CartProvider>
        <AppRoutes />
        </CartProvider >
      </LocaleContextProvider>
    </BrowserRouter>
  )
}

export default App
