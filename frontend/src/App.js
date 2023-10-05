import "#styles/main.scss"
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import { CartProvider } from "./context/cartContext"
import { LocaleContextProvider } from "./context/localeContext"
import { UserProvider } from "./context/userContext"

const App = () => {
  return (
    <BrowserRouter>
      <LocaleContextProvider>
        <UserProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </UserProvider>
      </LocaleContextProvider>
    </BrowserRouter>
  )
}

export default App
