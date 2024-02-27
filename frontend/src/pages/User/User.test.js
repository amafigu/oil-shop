import shippingData from "#__mocks__/shippingData"
import translate from "#__mocks__/translate"
import user from "#__mocks__/user"
import Header from "#components/ui/Header"
import ShippingData from "#components/users/ShippingData"
import GetOrders from "#components/users/UsersCrud/GetOrders"
import useUserContext from "#context/userContext"
import { useTranslation } from "#hooks/useTranslation"
import { useUserData } from "#hooks/useUserData"
import "@testing-library/jest-dom"
import "@testing-library/react"
import { render } from "@testing-library/react"
import axios from "axios"
import { UserData } from "./UserData"

jest.mock("#hooks/useTranslation")
jest.mock("#hooks/useUserData")
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
    //jest.mock({ setNonUpdatedShippingData: jest.fn() })
  })

  test("render Header correctly", () => {
    render(<Header data={user} />)
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
