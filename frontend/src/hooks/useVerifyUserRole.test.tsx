import { CURRENT_ADMIN, CURRENT_CUSTOMER, LOGIN } from "@/constants/routes"
import { useUserContext } from "@/context/userContext"
import { act, renderHook } from "@testing-library/react"
import { useNavigate } from "react-router-dom"
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest"
import { useVerifyUserRole } from "./useVerifyUserRole"

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}))

vi.mock("@/context/userContext", () => ({
  useUserContext: vi.fn(),
}))

describe("useVerifyUserRole does", () => {
  const navigate = vi.fn()

  beforeEach(() => {
    ;(useNavigate as Mock).mockReturnValue(navigate)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("navigate to CURRENT_ADMIN when user is admin", () => {
    ;(useUserContext as Mock).mockReturnValue({
      user: { role: { name: "admin" } },
      isLoading: false,
    })

    const { result } = renderHook(() => useVerifyUserRole())

    act(() => {
      result.current.verifyUserRole()
    })

    expect(navigate).toHaveBeenCalledWith(CURRENT_ADMIN)
  })

  it("navigate to CURRENT_CUSTOMER when user is customer", () => {
    ;(useUserContext as Mock).mockReturnValue({
      user: { role: { name: "customer" } },
      isLoading: false,
    })

    const { result } = renderHook(() => useVerifyUserRole())

    act(() => {
      result.current.verifyUserRole()
    })

    expect(navigate).toHaveBeenCalledWith(CURRENT_CUSTOMER)
  })

  it("should navigate to LOGIN when user role is not admin or customer", () => {
    ;(useUserContext as Mock).mockReturnValue({
      user: { role: { name: "guest" } },
      isLoading: false,
    })

    const { result } = renderHook(() => useVerifyUserRole())

    act(() => {
      result.current.verifyUserRole()
    })

    expect(navigate).toHaveBeenCalledWith(LOGIN)
  })

  it("should not navigate anywhere when loading", () => {
    ;(useUserContext as Mock).mockReturnValue({
      user: null,
      isLoading: true,
    })

    const { result } = renderHook(() => useVerifyUserRole())

    act(() => {
      result.current.verifyUserRole()
    })

    expect(navigate).not.toHaveBeenCalled()
  })
})
