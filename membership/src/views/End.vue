<template>
  <div class="end">
    <img src="../assets/images/end.png" alt="">
    <p>{{list}}</p>
    <router-link to='/MembershipCenter'>
      <div class="button">进入TOREAD会员中心</div>
    </router-link>      
  </div>
</template>
<script>
// import { login } from '@/api/index'
export default {
  name: 'End',
  data() {
    return {
      list:'来晚啦，本次活动已结束'
    }
  },
  created (){
  },     
  methods: {
    
  }
}
</script>
<style lang="less" scoped>
.end{
    text-align: center;
    overflow: hidden;
    img{
        display: block;
        width: 261px;
        margin: 100px auto 90px auto;
    }
    p{
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(102,102,102,1);
    }
    .button{
        width:335px;
        height:53px;
        line-height: 53px;
        background: #1B1E21;
        border-radius: 27px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        letter-spacing:1px;
        margin: 158px auto;
    } 
}
</style>