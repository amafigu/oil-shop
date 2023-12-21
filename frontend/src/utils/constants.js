export const SHIPPING_COST = 10

export const TEASER_VIDEOS = [{ id: "orangeFlowers" }]

export const DEFAULT_PRODUCT_IMAGE =
  "https://oylo-images.s3.us-east-2.amazonaws.com/default.png"

export const DEFAULT_USER_IMAGE =
  "https://oylo-images.s3.us-east-2.amazonaws.com/default_user.png"

export const API_USERS_CURRENT_USER = "/users/current-user/"
export const API_USERS_USER = "/users/user/"
export const API_SHIPPING_DATA = "/users/user/shipping-data/"
export const API_VERIFY_TOKEN = "/users/verify-token"
export const ROUTES_LOGIN = "/login"
export const SHORT_MESSAGE_TIMEOUT = 3000
export const REDIRECT_TIMEOUT = 2000

export const FORM_FIELDS_GUEST_USER_DATA = [
  {
    name: "firstName",
    placeholder: "first name",
    label: "First Name",
    type: "text",
    classCss: "formField",
  },
  {
    name: "lastName",
    placeholder: "lastName",
    label: "Last Name",
    type: "text",
    classCss: "formField",
  },
  {
    name: "email",
    placeholder: "Email",
    label: "Email",
    type: "email",
    classCss: "formField",
  },
]

export const FORM_FIELDS_SHIPPING_DATA = [
  {
    name: "street",
    placeholder: "street",
    label: "Street",
    type: "text",
    classCss: "formField",
  },
  {
    name: "number",
    placeholder: "number",
    label: "Number",
    type: "text",
    classCss: "formField",
  },
  {
    name: "details",
    placeholder: "details",
    label: "Details",
    type: "text",
    classCss: "formField",
  },
  {
    name: "postalCode",
    placeholder: "postal code",
    label: "Postal Code",
    type: "text",
    classCss: "formField",
  },
  {
    name: "city",
    placeholder: "city",
    label: "City",
    type: "text",
    classCss: "formField",
  },
  {
    name: "state",
    placeholder: "state",
    label: "State",
    type: "text",
    classCss: "formField",
  },
  {
    name: "country",
    placeholder: "country",
    label: "Country",
    type: "text",
    classCss: "formField",
  },
]

export const STYLES = Object.freeze({
  BUTTONS: {
    USER_OPTIONS: "userOptionsButton",
  },
  FORMS: {
    FIELD: "formField",
    ITEM_ROW: "itemRow",
  },
})

export const SPECIAL_CHARACTERS_REGEX = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/
