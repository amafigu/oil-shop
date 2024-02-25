// VARIABLES
export const SHIPPING_COST = 10

// API

// ROUTES
export const ROUTES_ABOUT = "/about"
export const ROUTES_CART = "/cart"
export const ROUTES_CHECKOUT_ORDER_SUMMARY = "/checkout/order-summary"
export const ROUTES_CHECKOUT_SHIPPING = "/checkout/shipping"
export const ROUTES_CHECKOUT_PAYMENT = "/checkout/payment"
export const ROUTES_CURRENT_CUSTOMER = "/users/current-customer"
export const ROUTES_CURRENT_ADMIN = "/users/current-admin"
export const ROUTES_FAQ = "/faq"
export const ROUTES_HOME = "/"
export const ROUTES_LOGIN = "/login"
export const ROUTES_PRODUCTS = "/products"
export const ROUTES_SHOP_QUERY_CATEGORY_PREFIX = "/shop?category="
export const ROUTES_SIGN_UP = "/sign-up"
export const ROUTES_SIGN_UP_ADMIN = "/sign-up-admin"
export const ROUTES_SHOP = "/shop"
export const ROUTES_WITHOUT_NAVBAR = [
  ROUTES_LOGIN,
  ROUTES_SIGN_UP,
  ROUTES_SIGN_UP_ADMIN,
]

// INPUTS CONSTANTS
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

// REGEX

export const SPECIAL_CHARACTERS_REGEX = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/
