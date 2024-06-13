import { createContext, useContext, useState } from "react"

export const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
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

const useMenuContext = () => useContext(MenuContext)
export default useMenuContext
