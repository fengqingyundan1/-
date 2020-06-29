<template>
  <div></div>
</template>

<script>
import { getInviteLogin } from '@/api/index'
import utils from '@/utils/util.js'
export default {
  name: 'defaultPage',
  mounted () {
    this.getAute();
  },
  methods: {
    async getAute () {      
      let param = {
        share_id: utils.getUrlKey('share_id'),
        uid: utils.getUrlKey('uid'),
        source:utils.getUrlKey('source'),  // 来源 钒钛
      }
      // console.log(utils.getUrlKey('source'))
      sessionStorage.setItem('uid',utils.getUrlKey('uid'))     
      sessionStorage.setItem('source',utils.getUrlKey('source'))     
      let res = (await getInviteLogin(param)).data
      if (res.code === 1) {
        if(res.uid !== ''){
          sessionStorage.setItem('uid',res.uid)
        }
        if(res.source !== ''){
          sessionStorage.setItem('source',res.source)   
        }
        if (res.user_target === 1) {
          this.$router.push('MembershipCenter')
        }
        if (res.user_target === 2) {
          // this.$router.push('BasicInfo')  // 暂时不需要 跳转信息页面 ePeng 需求
          this.$router.push('MembershipCenter')
        }
        if (res.user_target === 3) {
          this.$router.push('Register')
        }
        if (res.user_target === 4) {
          window.location.href = res.authorize_url
        }
        if (res.user_target === 5) {
          this.$router.push('GetCoupon?sid=' + res.sid)
        }
        if (res.user_target === 6) {  // 跳转户外宝
          window.location.href = res.url
        }
        if (res.user_target === 7) {  // 跳转户外宝
          this.$router.push('End')
        }
      } else {
        console.log('失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
