import { changeCount, getCartList } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setcartList (state, data) {
      state.cartList = data
    },
    toggleCheck (state, goodsId) {
      console.log(goodsId)
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, checked) {
      state.cartList.forEach(item => {
        item.isChecked = checked
      })
    },
    changeCount (state, obj) {
      const goods = state.cartList.find(item => item.goods_id === obj.goodsId)
      goods.goods_num = obj.goodsNum
    }

  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      data.list.forEach(element => {
        element.isChecked = true
      })
      context.commit('setcartList', data.list)
    },
    async changeCountAction (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      await changeCount(goodsId, goodsNum, goodsSkuId)
      context.commit('changeCount', {
        goodsId,
        goodsNum
      })
    }

  },
  getters: {
    cartTotal (state) {
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }

  }
}
