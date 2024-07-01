import { cartItem } from "@/__mocks__/cartItem"
import { user } from "@/__mocks__/user"
import { CartContext } from "@/context/cartContext"
import { LocaleContext } from "@/context/localeContext"
import { UserContext } from "@/context/userContext"
import { useCart } from "@/hooks/useCart"
import de from "@/i18n/de.json"
import en from "@/i18n/en.json"
import { CartItem } from "@/types/Cart"
import "@testing-library/jest-dom"
import { act, render, renderHook, screen } from "@testing-library/react"
import { FC, ReactNode, useState } from "react"
import { MemoryRouter } from "react-router-dom"
import { vi } from "vitest"
import { Cart } from "."

const languages = { en, de }

const LocaleContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<keyof typeof languages>("en")

  return (
    <LocaleContext.Provider
      value={{
        languages,
        translate: languages[language],
        language,
        setLanguage,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

const UserContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const userContextValue = {
    isLoggedIn: true,
    setIsLoggedIn: vi.fn(),
    isLoading: false,
    users: [],
    user: user,
    setUser: vi.fn(),
    onDeleteUser: vi.fn(),
    onCreateCustomer: vi.fn(),
    onUpdateUser: vi.fn(),
    onCreateAdmin: vi.fn(),
    onUpdateShippingData: vi.fn(),
    shippingData: {},
  }

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  )
}

const CartContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([cartItem])

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addProduct: vi.fn(),
        updateProductQuantity: vi.fn(),
        removeProduct: (productName: string) => {
          setCart(
            cart.filter((item: CartItem) => item.product.name !== productName),
          )
        },
        getAllProductsQuantity: cart.reduce(
          (total, item) => total + item.quantity,
          0,
        ),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

function renderCart() {
  render(
    <MemoryRouter>
      <LocaleContextWrapper>
        <UserContextWrapper>
          <CartContextWrapper>
            <Cart />
          </CartContextWrapper>
        </UserContextWrapper>
      </LocaleContextWrapper>
    </MemoryRouter>,
  )
}

describe("Cart should", () => {
  it("call remove product", async () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartContextWrapper,
    })

    expect(result.current.cart).toEqual([cartItem])

    act(() => {
      result.current.removeProduct("cart item product")
    })

    expect(result.current.cart).toEqual([])
  })

  it("renders products correctly", () => {
    renderCart()
    expect(screen.getByText("Cart item product")).toBeInTheDocument()
  })
})
