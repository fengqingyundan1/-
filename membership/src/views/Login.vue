<template>
  <div class="login">
    <router-link :to="'Integral'" class="weui-btn weui-btn_mini weui-btn_primary">积分</router-link>
    <router-link :to="'GrowthValue'" class="weui-btn weui-btn_mini weui-btn_primary">成长值</router-link>
    <router-link :to="'Coupon'" class="weui-btn weui-btn_mini weui-btn_primary">优惠券</router-link>
    <router-link :to="'MemberInfo'" class="weui-btn weui-btn_mini weui-btn_primary">会员资料</router-link>
    <router-link :to="'ActivityList'" class="weui-btn weui-btn_mini weui-btn_primary">活动列表</router-link>
    <router-link :to="'InviteNewpeople'" class="weui-btn weui-btn_mini weui-btn_primary">邀请新人</router-link>
    <router-link :to="'MembershipCenter'" class="weui-btn weui-btn_mini weui-btn_primary">会员中心</router-link>
    <router-link :to="'Register'" class="weui-btn weui-btn_mini weui-btn_primary">登录注册</router-link>
    <router-link :to="'BasicInfo'" class="weui-btn weui-btn_mini weui-btn_primary">会员基本信息</router-link>
    <!--<router-link :to="'rightsExplain'" class="weui-btn weui-btn_mini weui-btn_primary">会员权益</router-link>-->
    <router-link :to="'BasicInfo'" class="weui-btn weui-btn_mini weui-btn_primary">空白页</router-link>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>

</style>
