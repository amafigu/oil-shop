import { ActionButton } from "#components/ui/ActionButton"
import { useLogout } from "#hooks/useLogout"
import { getIconByName } from "#utils/getIconByName"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const LogoutButton = ({ className }) => {
  const { setLogout } = useLogout()
  return (
    <ActionButton
      action={() => setLogout()}
      text={
        <FontAwesomeIcon
          icon={getIconByName("faArrowRightFromBracket")}
          size='2xl'
        />
      }
      className={className}
      ariaLabel={"Logout"}
    />
  )
}
