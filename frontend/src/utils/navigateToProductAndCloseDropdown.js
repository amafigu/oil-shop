import { ROUTES_PRODUCTS } from "#constants/routes"

export const navigateToProductAndCloseDropdown = (
  name,
  navigate,
  setItemsList,
  setShowList,
  setSearchProductText,
) => {
  navigate(`${ROUTES_PRODUCTS}/${name}`)
  setItemsList([])
  setShowList(false)
  setSearchProductText("")
}
