import {
  commonButtons,
  commonProperties,
  translate,
} from "#__mocks__/translate"
import user from "#__mocks__/user"
import { useTranslation } from "#hooks/useTranslation"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import React from "react"
import { EditableItemInput } from "./index"

jest.mock("#hooks/useTranslation")
jest.mock("#context/userContext")

function renderInput(onChangeMocked, onSaveMocked) {
  return render(
    <EditableItemInput
      label='firstName'
      name='firstName'
      updatedPropertyData={user}
      onChange={onChangeMocked}
      onSave={onSaveMocked}
      classCss='testClass'
      type='text'
    />,
  )
}

describe("EditableInput", () => {
  let mockOnChange
  let mockOnSave

  beforeEach(() => {
    mockOnChange = jest.fn()
    mockOnSave = jest.fn()

    useTranslation.mockReturnValue({
      translate,
      commonProperties,
      commonButtons,
    })
  })

  test("renders correctly", () => {
    renderInput(mockOnChange, mockOnSave, commonProperties)
    expect(screen.getByLabelText("edit item")).toBeInTheDocument()
  })
})
