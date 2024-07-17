import { ActionButton } from "@/components/ui/ActionButton"
import { useLogout } from "@/hooks/useLogout"
import { getIconByName } from "@/utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"

interface LogoutButtonProps {
  className: string
}

export const LogoutButton: FC<LogoutButtonProps> = ({ className }) => {
  const { setLogout } = useLogout()
  return (
    <ActionButton
      action={() => setLogout()}
      text={
        <FontAwesomeIcon
          icon={getIconByName("faArrowRightFromBracket")}
          size='2xl'
          color='#fff'
        />
      }
      className={className}
      ariaLabel={"Logout"}
    />
  )
}
