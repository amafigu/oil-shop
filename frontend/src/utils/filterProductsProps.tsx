import { STYLES } from "@/constants/styles"
import { Product } from "@/types/Product"
export const filterProductsProps = [
  {
    action: (list: Product[], sortIsAsc: boolean) =>
      sortIsAsc
        ? list.sort((a, b) => a.name.localeCompare(b.name))
        : list.sort((a, b) => b.name.localeCompare(a.name)),
    targetProperty: "name",
    className: STYLES.BUTTONS.ACTION,
    isAsc: true,
  },
  {
    action: (list: Product[], sortIsAsc: boolean) =>
      sortIsAsc
        ? list.sort((a, b) => a.categoryId - b.categoryId)
        : list.sort((a, b) => b.categoryId - a.categoryId),

    targetProperty: "category",
    className: STYLES.BUTTONS.ACTION,
    isAsc: true,
  },
  {
    action: (list: Product[], sortIsAsc: boolean) =>
      sortIsAsc
        ? list.sort((a, b) => a.price - b.price)
        : list.sort((a, b) => b.price - a.price),

    targetProperty: "price",
    className: STYLES.BUTTONS.ACTION,
    isAsc: true,
  },
  {
    action: (list: Product[], sortIsAsc: boolean) =>
      sortIsAsc
        ? list.sort((a, b) => a.size - b.size)
        : list.sort((a, b) => b.size - a.size),

    targetProperty: "size",
    className: STYLES.BUTTONS.ACTION,
    isAsc: true,
  },
]
