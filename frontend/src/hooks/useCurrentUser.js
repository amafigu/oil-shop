import useUserContext from "#context/userContext"

export const useCurrentUser = () => {
  const { setIsLoggedIn, setUserEmail, setUser, user } = useUserContext()

  return { setIsLoggedIn, setUserEmail, setUser, user }
}
