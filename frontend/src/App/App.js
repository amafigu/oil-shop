import { CartProvider } from "#context/cartContext"
import { LocaleContextProvider } from "#context/localeContext"
import { MenuProvider } from "#context/menuContext"
import { NotificationProvider } from "#context/notificationContext"
import { ProductProvider } from "#context/productContext"
import { UserProvider } from "#context/userContext"
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./AppRoutes"

export const App = () => {
  return (
    <BrowserRouter>
      <MenuProvider>
        <NotificationProvider>
          <LocaleContextProvider>
            <UserProvider>
              <ProductProvider>
                <CartProvider>
                  <AppRoutes />
                </CartProvider>
              </ProductProvider>
            </UserProvider>
          </LocaleContextProvider>
        </NotificationProvider>
      </MenuProvider>
    </BrowserRouter>
  )
}
