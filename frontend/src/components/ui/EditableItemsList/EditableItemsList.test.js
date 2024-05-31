import {
  commonButtons,
  commonProperties,
  components,
  pages,
} from "#__mocks__/translate"
import users from "#__mocks__/users"
import { EditableItem } from "#components/ui/EditableItem"
import { editableUserProperties } from "#constants/users"
import { useTranslation } from "#hooks/useTranslation"
import { onDeleteUser } from "#utils/onDeleteUser"
import { onUpdateUser } from "#utils/onUpdateUser"
import "@testing-library/jest-dom"
import "@testing-library/react"
import { fireEvent, render, screen } from "@testing-library/react"
import { EditableItemsList } from "./index"

jest.mock("#hooks/useTranslation")
jest.mock("#utils/onDeleteUser")
// TODO: use the crud methods from the context
describe("EditableItemsList component does", () => {
  let mockUsers

  beforeEach(() => {
    mockUsers = [...users]

    useTranslation.mockReturnValue({
      pages,
      commonProperties,
      commonButtons,
      components,
    })

    onDeleteUser.mockImplementation((e, userId, setNotification) => {
      mockUsers = mockUsers.filter((user) => user.id !== userId)
    })
  })

  test("render user props correctly", () => {
    render(
      <EditableItemsList
        itemsList={users}
        ItemComponent={EditableItem}
        itemProps={{ renderItemProps: editableUserProperties }}
      />,
    )

    expect(screen.getByText("Test one firstName")).toBeInTheDocument()
    expect(screen.getByText("Test one lastname")).toBeInTheDocument()
    expect(screen.getByText("testone@mail.com")).toBeInTheDocument()

    expect(screen.getByText("Test two firstName")).toBeInTheDocument()
    expect(screen.getByText("Test two lastname")).toBeInTheDocument()
    expect(screen.getByText("testtwo@mail.com")).toBeInTheDocument()
  })

  test("refresh the list when delete one item", async () => {
    const { rerender } = render(
      <EditableItemsList
        itemsList={mockUsers}
        ItemComponent={EditableItem}
        itemProps={{
          onSave: onUpdateUser,
          onDelete: onDeleteUser,
          renderItemProps: editableUserProperties,
        }}
      />,
    )

    const deleteButtons = screen.getAllByText("Delete")
    fireEvent.click(deleteButtons[0])

    rerender(
      <EditableItemsList
        itemsList={mockUsers}
        ItemComponent={EditableItem}
        itemProps={{
          onSave: jest.fn(),
          onDelete: onDeleteUser,
          renderItemProps: editableUserProperties,
        }}
      />,
    )

    expect(onDeleteUser).toHaveBeenCalled()
    expect(mockUsers.length).toBe(1)
    expect(screen.queryByText("Test one firstName")).not.toBeInTheDocument()
  })
})
