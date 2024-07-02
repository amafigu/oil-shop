import { STYLES } from "@/constants/styles"
import { User } from "@/types/User"
export const filterUsersProps = [
  {
    action: (list: User[], sortIsAsc: boolean) =>
      sortIsAsc
        ? list.sort((a, b) => a.firstName.localeCompare(b.firstName))
        : list.sort((a, b) => b.firstName.localeCompare(a.firstName)),
    targetProperty: "firstName",
    className: STYLES.BUTTONS.ACTION,
    isAsc: true,
  },
  {
    action: (list: User[], sortIsAsc: boolean) =>
      sortIsAsc
        ? list.sort((a, b) => a.lastName.localeCompare(b.lastName))
        : list.sort((a, b) => b.lastName.localeCompare(a.lastName)),
    targetProperty: "lastName",
    className: STYLES.BUTTONS.ACTION,
    isAsc: true,
  },
  {
    action: (list: User[], sortIsAsc: boolean) =>
      sortIsAsc
        ? list.sort((a, b) => a.email.localeCompare(b.email))
        : list.sort((a, b) => b.email.localeCompare(a.email)),
    targetProperty: "email",
    className: STYLES.BUTTONS.ACTION,
    isAsc: true,
  },
]
