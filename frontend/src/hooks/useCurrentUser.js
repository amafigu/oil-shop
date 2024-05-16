import useUserContext from "#context/userContext"

export const useCurrentUser = () => {
  const { setIsLoggedIn, setUser, user, isLoggedIn } = useUserContext()

  return { setIsLoggedIn, setUser, user, isLoggedIn }
}
