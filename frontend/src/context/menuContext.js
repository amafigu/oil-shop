import { createContext, useContext, useState } from "react"

export const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <MenuContext.Provider value={{ showMobileMenu, setShowMobileMenu }}>
      {children}
    </MenuContext.Provider>
  )
}

const useMenuContext = () => useContext(MenuContext)
export default useMenuContext
