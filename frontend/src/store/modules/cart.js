import axios from "axios"
export default {
  actions: {
    async applyCoupon({ getters, commit }, coupon) {
      try {
        const response = await axios.get(
          `${getters.getBackendUrl}v1/coupon/${coupon}/`
        )
        commit("setCoupon", response.data)
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message
          return errorMessage
        }
      }
    },
    async addItemToCart({ getters, commit }, context) {
      const { productSlug, colorSlug, size } = context
      const response = await axios
        .get(
          `${
            getters.getBackendUrl
          }v1/products/${productSlug}/${colorSlug}/${size.toUpperCase()}/`
        )
        .then((response) => response.data)

      commit("addToCart", response)
    },
  },
  state: {
    cart: [],
    coupon: null,
    total: 0,
  },
  getters: {
    getCoupon: (state) => state.coupon,
    getTotal: (state) => state.total,
    getCart: (state) => state.cart,
    isItemInCart: (state) => (context) => {
      return state.cart.some((item) => {
        return (
          item.productSlug === context.productSlug &&
          item.colorSlug === context.colorSlug &&
          item.size === context.size
        )
      })
    },
  },
  mutations: {
    resetCoupon(state) {
      state.coupon = null
    },
    setCoupon(state, couponObj) {
      state.coupon = couponObj
    },
    setTotal(state) {
      state.total = state.cart.reduce(
        (accumulator, current) =>
          accumulator +
          (current.price -
            (current.price / 100) *
              (state.coupon ? state.coupon.discount : 0)) *
            current.quantity,
        0
      )
    },
    removeProduct(state, context) {
      const index = state.cart.findIndex((item) => {
        return (
          item.productSlug === context.productSlug &&
          item.colorSlug === context.colorSlug &&
          item.size === context.size
        )
      })
      if (index !== -1) {
        state.cart.splice(index, 1)
      }
    },
    increaseQuantity(state, context) {
      const product = state.cart.find((item) => {
        return (
          item.productSlug === context.productSlug &&
          item.colorSlug === context.colorSlug &&
          item.size === context.size
        )
      })
      if (product) {
        product.quantity += 1
      }
    },
    reduceQuantity(state, context) {
      const product = state.cart.find((item) => {
        return (
          item.productSlug === context.productSlug &&
          item.colorSlug === context.colorSlug &&
          item.size === context.size
        )
      })
      if (product) {
        product.quantity -= 1
      }
    },
    createCart(state, cart) {
      state.cart = cart
    },
    addToCart(state, data) {
      if (data) {
        data.quantity = 1
        state.cart.push(data)
      }
    },
  },
}
