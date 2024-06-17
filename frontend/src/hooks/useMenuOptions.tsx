import { useMenuContext } from "@/context/menuContext"

export const useMenuOptions = () => {
  const {
    showMobileMenu,
    setShowMobileMenu,
    showProductsSearchBar,
    setShowProductsSearchBar,
  } = useMenuContext()

  return {
    showMobileMenu,
    setShowMobileMenu,
    showProductsSearchBar,
    setShowProductsSearchBar,
  }
}
