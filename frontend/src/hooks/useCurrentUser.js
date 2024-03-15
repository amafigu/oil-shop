import useUserContext from "#context/userContext"

export const useCurrentUser = () => {
  const { setIsLoggedIn, setUserEmail, setUser, user, isLoggedIn, userId } =
    useUserContext()

  return { setIsLoggedIn, setUserEmail, setUser, user, isLoggedIn, userId }
}
