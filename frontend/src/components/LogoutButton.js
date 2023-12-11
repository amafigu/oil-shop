import { logout } from "#utils/users"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const LogoutButton = ({ navigate, setIsLoggedIn, setUserEmail, setUser }) => {
  return (
    <FontAwesomeIcon
      icon={faArrowRightFromBracket}
      onClick={() => logout(navigate, setIsLoggedIn, setUserEmail, setUser)}
    />
  )
}

export default LogoutButton
