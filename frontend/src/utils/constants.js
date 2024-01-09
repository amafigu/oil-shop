// VARIABLES
export const SHIPPING_COST = 10
export const LOCAL_STORAGE_GUEST_ID = "yolo-guest-id"
export const LOCAL_STORAGE_CART = "yolo-cart"
// MEDIA URLS
export const DEFAULT_PRODUCT_IMAGE =
  "https://oylo-images.s3.us-east-2.amazonaws.com/default.png"

export const DEFAULT_USER_IMAGE =
  "https://oylo-images.s3.us-east-2.amazonaws.com/default_user.png"

// INTERNAL MEDIA PATHS AND VARIABLES
export const TEASER_VIDEOS = [{ id: "orangeFlowers" }]
export const LOGO_IMAGE = "/assets/logo.png"
// SOCIAL MEDIA URLS
export const SOCIAL_MEDIA_URL_FACEBOOK = "https://www.facebook.com"
export const SOCIAL_MEDIA_URL_INSTAGRAM = "https://www.instagram.com"
export const SOCIAL_MEDIA_URL_YOUTUBE = "https://www.youtube.com"

// API
export const API_PRODUCTS = "/products"
export const API_PRODUCT_CATEGORIES = "/product-categories"
export const API_PRODUCTS_PRODUCT = "/products/product"
export const API_PRODUCTS_PRODUCT_CREATE = "/products/product/create"
export const API_PRODUCTS_PRODUCT_GET_BY_NAME = "/products/product/get-by-name"

export const API_USERS_CURRENT_PREFIX = "/users/current-" // + admin or customer;
export const API_USERS_CURRENT_USER = "/users/current-user"
export const API_USERS_USER = "/users/user"
export const API_USER_ROLE = "/users/user/role"
export const API_USERS_CREATE = "/users/create"
export const API_USERS_CREATE_GUEST = "/users/create-guest"
export const API_USERS_GUEST_BY_ID = "/users/guest/id"
export const API_USERS_GUEST_BY_EMAIL = "/users/guest/email"
export const API_SHIPPING_DATA = "/users/user/shipping-data"
export const API_VERIFY_TOKEN = "/users/verify-token"
export const API_LOGIN = "/users/login"
export const API_LOGOUT = "/users/logout"
export const API_ORDERS_ALL = "/orders/all"
export const API_ORDERS_CART_ITEMS = "/orders/cart-items"
export const API_ORDERS_CREATE = "/orders/create"

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
export const ROUTES_SIGN_UP = "/sign-up"
export const ROUTES_SHOP = "/shop"

// TIME CONSTANTS
export const SHORT_MESSAGE_TIMEOUT = 3000
export const LONG_MESSAGE_TIMEOUT = 6000
export const REDIRECT_TIMEOUT = 1000

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

export const STYLES = Object.freeze({
  BUTTONS: {
    USER_OPTIONS: "userOptionsButton",
  },
  FORMS: {
    FIELD: "formField",
    FIELD_SEARCH_INPUT: "formFieldSearchInput",
    ITEM_ROW: "itemRow",
  },
})

// REGEX

export const SPECIAL_CHARACTERS_REGEX = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/
