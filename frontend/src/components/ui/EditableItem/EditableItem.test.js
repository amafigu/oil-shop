import product from "#__mocks__/product"
import {
  commonButtons,
  commonProperties,
  components,
  translate,
} from "#__mocks__/translate"
import user from "#__mocks__/user"
import { editableProductProperties } from "#constants/products"
import { editableUserProperties } from "#constants/users"
import { useTranslation } from "#hooks/useTranslation"
import { onDeleteProduct } from "#utils/onDeleteProduct"
import { onDeleteUser } from "#utils/onDeleteUser"
import { onUpdateProduct } from "#utils/onUpdateProduct"
import { onUpdateUser } from "#utils/onUpdateUser"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import "jest-environment-jsdom"
import { EditableItem } from "./index"

jest.mock("#utils/onUpdateProduct")
jest.mock("#api/products/updateProductDataRequest")
jest.mock("#context/userContext")
jest.mock("#context/productContext")
jest.mock("#utils/onUpdateUser")
jest.mock("#utils/onDeleteUser")
jest.mock("#utils/onDeleteProduct")
jest.mock("#utils/onUpdateProduct")
jest.mock("#hooks/useTranslation")

describe("Editable Item should", () => {
  beforeEach(() => {
    useTranslation.mockReturnValue({
      translate,
      components,
      commonProperties,
      commonButtons,
    })
  })

  test("render user correctly", () => {
    render(
      <EditableItem
        item={user}
        renderItemProps={editableUserProperties}
        onSave={onUpdateUser}
        onDelete={onDeleteUser}
      />,
    )
    expect(screen.getByText("Test firstName")).toBeInTheDocument()
  })

  test("render product correctly", () => {
    render(
      <EditableItem
        item={product}
        renderItemProps={editableProductProperties}
        onSave={onUpdateProduct}
        onDelete={onDeleteProduct}
      />,
    )
    expect(screen.getByText("Test Product")).toBeInTheDocument()
  })
})
