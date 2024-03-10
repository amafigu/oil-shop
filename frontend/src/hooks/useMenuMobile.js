import useMenuContext from "#context/menuContext"

export const useMenuMobile = () => {
  const { showMobileMenu, setShowMobileMenu } = useMenuContext()

  return {
    showMobileMenu,
    setShowMobileMenu,
  }
}
