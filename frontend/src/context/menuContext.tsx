import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"

interface MenuContextType {
  showMobileMenu: boolean
  setShowMobileMenu: Dispatch<SetStateAction<boolean>>
  activePageLink: string
  setActivePageLink: Dispatch<SetStateAction<string>>
  showProductsSearchBar: boolean
  setShowProductsSearchBar: Dispatch<SetStateAction<boolean>>
}

export const MenuContext = createContext<MenuContextType | null>(null)

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [activePageLink, setActivePageLink] = useState("")
  const [showProductsSearchBar, setShowProductsSearchBar] = useState(false)
  return (
    <MenuContext.Provider
      value={{
        showMobileMenu,
        setShowMobileMenu,
        activePageLink,
        setActivePageLink,
        showProductsSearchBar,
        setShowProductsSearchBar,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export const useMenuContext = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider")
  }
  return context
}
