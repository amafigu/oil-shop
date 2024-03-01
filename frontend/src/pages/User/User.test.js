import { shippingData } from "#__mocks__/shippingData"
import { translate } from "#__mocks__/translate"
import user from "#__mocks__/user"
import { UserHeader } from "#components/ui/UserHeader"
import GetOrders from "#components/users/UsersCrud/GetOrders"
import useUserContext from "#context/userContext"
import { useGetOriginalShippingData } from "#hooks/useGetOriginalShippingData"
import { useTranslation } from "#hooks/useTranslation"
import { useUserData } from "#hooks/useUserData"
import "@testing-library/jest-dom"
import "@testing-library/react"
import { render } from "@testing-library/react"
import axios from "axios"
import { ShippingData } from "./ShippingData"
import { UserData } from "./UserData"

jest.mock("#hooks/useTranslation")
jest.mock("#hooks/useUserData")
jest.mock("#hooks/useGetOriginalShippingData")
jest.mock("#context/userContext")
jest.mock("axios")

describe("User page should", () => {
  beforeAll(() => {
    axios.put.mockResolvedValue({ data: { shippingData }, status: 200 })
    axios.get.mockResolvedValue({ data: { user }, status: 200 })
    useTranslation.mockReturnValue({ translate })
    useUserData.mockReturnValue({
      setUser: jest.fn(),
      setNonUpdatedUserData: jest.fn(),
    })
    useUserContext.mockReturnValue({ userId: 243 })
    useGetOriginalShippingData.mockReturnValue({
      setNonUpdatedShippingData: jest.fn(),
    })
  })

  test("render Header correctly", () => {
    render(<UserHeader data={user} />)
  })
  test("render UserData correctly", () => {
    render(<UserData />)
  })
  test("render ShippingData correctly", () => {
    render(<ShippingData />)
  })
  test("render GetOrders correctly", () => {
    render(<GetOrders />)
  })
})
