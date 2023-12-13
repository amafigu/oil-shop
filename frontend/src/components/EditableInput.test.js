import translate from "#__mocks__/translate" // Change this line
import useLocaleContext from "#context/localeContext"
import { render } from "@testing-library/react"
import React from "react"
import EditableInput from "./EditableInput"

jest.mock("#context/localeContext")
jest.mock("#context/userContext")

describe("EditableInput", () => {
  let component
  let mockOnChange
  let mockOnSave

  beforeEach(() => {
    mockOnChange = jest.fn()
    mockOnSave = jest.fn()

    useLocaleContext.mockReturnValue({ translate })

    component = render(
      <EditableInput
        label='firstName'
        name='firstName'
        onChange={mockOnChange}
        onSave={mockOnSave}
        classCss='testClass'
        originalPropertyData={{
          firstName: "",
        }}
        updatedPropertyData={{
          firstName: "",
        }}
      />,
    )
  })

  test("renders correctly", () => {
    expect(component).toBeTruthy()
  })
  /*
  test("reads initial data correctly", () => {
    const input = component.getByLabelText("Test input")
    expect(input.value).toBe("Original")
  }) */

  /*  test("updates data correctly", () => {
    const input = component.getByLabelText("Test input")
    fireEvent.change(input, { target: { value: "New value" } })
    expect(mockOnChange).toHaveBeenCalled()
    expect(input.value).toBe("New value")
  }) */

  // Add a similar test for the delete operation if your component supports it
})
