import { translate } from "#__mocks__/translate"
import { useTranslation } from "#hooks/useTranslation"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import EditableInput from "./EditableInput"

jest.mock("#hooks/useTranslation")
jest.mock("#context/userContext")

function renderInput(onChangeMocked, onSaveMocked, textData) {
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

  return render(
    <EditableInput
      label='firstName'
      name='firstName'
      onChange={onChangeMocked}
      onSave={onSaveMocked}
      classCss='testClass'
      originalPropertyData={originalPropertyData}
      updatedPropertyData={updatedPropertyData}
      placeholder={textData["firstName"]}
      value={
        updatedPropertyData["firstName"] ||
        updatedPropertyData["firstName"] === ""
          ? updatedPropertyData["firstName"]
          : originalPropertyData["firstName"]
      }
    />,
  )
}

describe("EditableInput", () => {
  let mockOnChange
  let mockOnSave
  let textProperties

  beforeEach(() => {
    mockOnChange = jest.fn()
    mockOnSave = jest.fn()

    textProperties = translate.components.crud.forms.commonProperties
    useTranslation.mockReturnValue({ translate })
  })

  test("renders correctly", () => {
    renderInput(mockOnChange, mockOnSave, textProperties)
    expect(screen.getByLabelText("Edit")).toBeInTheDocument()
  })
})
