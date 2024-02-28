module.exports = {
  errors: {
    requests: {
      user: {
        getUserData: "Error while getting user data",
      },
    },
  },
  pages: {
    cart: {
      deleteButton: "Delete",
      orderSummary: "Order Summary",
      orderSubtotal: "Order Subtotal",
      orderShipping: "Shipping",
      orderTotal: "Total",
    },
    about: {
      title: "Hi! Thanks for visiting Oylo, Portfolio web-shop",
    },
    faq: {
      difuserRoomSizeQuestion: "Which difuser is suitable for which room size?",
    },
    notFound: "Unfortunately this page does not exist.",
    orderSummary: {
      orderResume: "Order Summary",
    },
  },
  components: {
    addOneToCartButton: {
      text: "add to cart",
    },
    buttons: {
      actions: {
        user: {
          hide: "Hide user data",
          show: "Show user data",
        },
        shipping: {
          show: "Show shipping data",
          hide: "Hide shipping data",
        },
      },
    },
    crud: {
      buttons: {
        edit: "Edit",
        save: "Save",
      },
      forms: {
        commonProperties: {
          firstName: "First name",
          email: "Email",
          imageUrl: "Image Url",
          lastName: "Last name",
        },
      },
    },
    products: {
      oil: {
        size: "size",
        price: "price",
      },
    },
  },
  warningMessages: {
    users: {
      shippingDataIsEmpty:
        "enter your shipping data by editing and saving fields",
    },
  },
}
