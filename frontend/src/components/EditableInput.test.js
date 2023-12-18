import translate from "#__mocks__/translate"
import useLocaleContext from "#context/localeContext"
import { render } from "@testing-library/react"
import React from "react"
import EditableInput from "./EditableInput"

jest.mock("#context/localeContext")
jest.mock("#context/userContext")

describe("EditableInput", () => {
  let mockOnChange
  let mockOnSave

  beforeEach(() => {
    mockOnChange = jest.fn()
    mockOnSave = jest.fn()

    useLocaleContext.mockReturnValue({ translate })

    const textProperties = translate.components.crud.forms.commonProperties
    const updatedPropertyData = {
      firstName: "firstNameUpdated",
      lastName: "lastNameUpdated",
      email: "emailUpdated",
      image: "imageUpdated",
    }

    const originalPropertyData = {
      firstName: "firstNameOriginal",
      lastName: "lastNameOriginal",
      email: "emailOriginal",
      image: "imageOriginal",
    }

    component = render(
      <EditableInput
        label='firstName'
        name='firstName'
        onChange={mockOnChange}
        onSave={mockOnSave}
        classCss='testClass'
        originalPropertyData={originalPropertyData}
        updatedPropertyData={updatedPropertyData}
        placeholder={textProperties[name]}
        value={
          updatedPropertyData[name] || updatedPropertyData[name] === ""
            ? updatedPropertyData[name]
            : originalPropertyData[name]
        }
      />,
    )
  })

  test("render correctly", () => {
    expect(component).toBeTruthy()
  })

  // Add a similar test for the delete operation if your component supports it
})
