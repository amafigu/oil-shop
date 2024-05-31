import { STYLES } from "#constants/styles"
export const filterProductsProps = [
  {
    action: (list, sortIsAsc) =>
      sortIsAsc
        ? list.sort((a, b) => a.name.localeCompare(b.name))
        : list.sort((a, b) => b.name.localeCompare(a.name)),
    targetProperty: "name",
    className: STYLES.BUTTONS.ACTION,
    isAsc: true,
  },
  {
    action: (list, sortIsAsc) =>
      sortIsAsc
        ? list.sort((a, b) => a.category - b.category)
        : list.sort((a, b) => b.category - a.category),

    targetProperty: "category",
    className: STYLES.BUTTONS.ACTION,
    isAsc: true,
  },
  {
    action: (list, sortIsAsc) =>
      sortIsAsc
        ? list.sort((a, b) => a.price - b.price)
        : list.sort((a, b) => b.price - a.price),

    targetProperty: "price",
    className: STYLES.BUTTONS.ACTION,
    isAsc: true,
  },
  {
    action: (list, sortIsAsc) =>
      sortIsAsc
        ? list.sort((a, b) => a.size - b.size)
        : list.sort((a, b) => b.size - a.size),

    targetProperty: "size",
    className: STYLES.BUTTONS.ACTION,
    isAsc: true,
  },
]
