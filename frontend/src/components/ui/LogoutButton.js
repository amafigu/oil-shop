import { logout } from "#utils/users"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const LogoutButton = ({ navigate, setIsLoggedIn }) => {
  return (
    <FontAwesomeIcon
      icon={faArrowRightFromBracket}
      onClick={() => logout(navigate, setIsLoggedIn)}
    />
  )
}

export default LogoutButton
