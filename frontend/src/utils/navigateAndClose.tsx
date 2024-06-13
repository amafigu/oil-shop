import { PRODUCTS } from "#constants/routes"

export const navigateAndClose = (
  name,
  navigate,
  setItemsList,
  setShowList,
  setSearchProductText,
) => {
  navigate(`${PRODUCTS}/${name}`)
  setItemsList([])
  setShowList(false)
  setSearchProductText("")
}
