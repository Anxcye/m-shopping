export default {
  methods: {
    loginConfirm () {
      if (!this.$store.state.user.userInfo.token) {
        this.$dialog
          .confirm({
            title: '提示',
            message: '您还未登录，是否前往登录？',
            confirmButtonText: '去登录',
            cancelButtonText: '再逛逛'
          })
          .then(() => {
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => { })
        return true
      }
      return false
    }
  }
}
