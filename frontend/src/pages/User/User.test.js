import orders from "#__mocks__/orders"
import shippingData from "#__mocks__/shippingData"
import {
  commonButtons,
  commonProperties,
  components,
  pages,
  translate,
} from "#__mocks__/translate"
import user from "#__mocks__/user"
import { EditableItem } from "#components/ui/EditableItem"
import { EditableItemsList } from "#components/ui/EditableItemsList"
import { UserHeader } from "#components/ui/UserHeader"
import { editableUserShippingDataProperties } from "#constants/shippingData"
import { editableUserProperties } from "#constants/users"
import useUserContext from "#context/userContext"
import { useGetOrdersWithProducts } from "#hooks/useGetOrdersWithProducts"
import { useGetUserShippingData } from "#hooks/useGetUserShippingData"
import { useTranslation } from "#hooks/useTranslation"
import { Order } from "#pages/User/Order"
import { onUpdateUser } from "#utils/onUpdateUser"
import { onUpdateUserShippingData } from "#utils/onUpdateUserShippingData"
import "@testing-library/jest-dom"
import "@testing-library/react"
import { render, screen } from "@testing-library/react"

jest.mock("#hooks/useTranslation")
jest.mock("#hooks/useGetUserShippingData")
jest.mock("#hooks/useGetOrdersWithProducts")
jest.mock("#context/userContext")
jest.mock("axios")

describe("User page should", () => {
  beforeAll(() => {
    useTranslation.mockReturnValue({
      translate,
      components,
      commonProperties,
      commonButtons,
      pages,
    })
    useUserContext.mockReturnValue({ user })
    useGetUserShippingData.mockReturnValue({ shippingData })
    useGetOrdersWithProducts.mockReturnValue({ orders })
  })

  test("render UserHeader correctly", () => {
    render(<UserHeader data={user} />)
    expect(screen.getByLabelText("User Description")).toBeInTheDocument()
  })

  test("render User data correctly", () => {
    render(
      <EditableItem
        item={user}
        renderItemProps={editableUserProperties}
        onSave={onUpdateUser}
      />,
    )
    expect(screen.getByText("Test firstName")).toBeInTheDocument()
  })

  test("render Shipping Data correctly", () => {
    render(
      <EditableItem
        item={shippingData}
        renderItemProps={editableUserShippingDataProperties}
        onSave={onUpdateUserShippingData}
      />,
    )
    expect(screen.getByText("123456")).toBeInTheDocument()
  })

  test("render Orders Data correctly", () => {
    render(
      <EditableItemsList
        itemsList={orders}
        ItemComponent={Order}
        title={components.ordersList.title}
      />,
    )
    expect(screen.getByText("333.00 € per unit")).toBeInTheDocument()
  })
})
