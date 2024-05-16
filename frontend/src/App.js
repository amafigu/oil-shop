import "#styles/main.scss"
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./AppRoutes"
import { CartProvider } from "./context/cartContext"
import { LocaleContextProvider } from "./context/localeContext"
import { MenuProvider } from "./context/menuContext"
import { ProductProvider } from "./context/productContext"
import { UserProvider } from "./context/userContext"

export const App = () => {
  return (
    <BrowserRouter>
      <LocaleContextProvider>
        <UserProvider>
          <ProductProvider>
            <CartProvider>
              <MenuProvider>
                <AppRoutes />
              </MenuProvider>
            </CartProvider>
          </ProductProvider>
        </UserProvider>
      </LocaleContextProvider>
    </BrowserRouter>
  )
}
