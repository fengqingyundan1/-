<template>
  <div class="Register">
    <div class="Register-up">
      <img class="Register-up-img"  src="../assets/images/register.png"/>
      <div class="Register-up-text-box">
        <div class="Register-up-text-box-inner">
          <div class="Register-up-title">探路者官方邀您注册会员</div>
          <div class="Register-up-text">首发活动、限定会员体验，你的户外主场</div>
          <img class="Register-up-vip-img" src="../assets/images/vip@2x.png"/>
        </div>
      </div>
    </div>
    <div class="Register-center">
      <ul class="Register-center-tell-box">
        <li class="Register-center-tell-item">
          <input v-model="tellPhoneNum" class="Register-center-tell-item-input" value="" type="" placeholder="请输入您的手机号码"/>
        </li>
        <li class="Register-center-tell-item clearfix">
          <input v-model="tellCode" maxlength="6" class="Register-center-item-input" value="" placeholder="请输入验证码"/>
          <button @click="getCode" class="Register-center-item-btn">{{this.btnTitle}}</button>
        </li>
      </ul>
      <transition name="fade">
        <tips :tipMsg="tipMsg" v-show="tipShow" transiton="fade" :icon="icon"></tips>
      </transition>
    </div>
    <div class="Register-down">
      <div @click="submit" class="Register-down-btn " :class="{'disable-btn':!trim(tellPhoneNum).length>0}">登录/注册</div>
    </div>
  </div>
</template>

<script>
import tips from '../components/Tips'
import { getSmsCode, register, getInviteLogin } from '@/api/index'
import utils from '@/utils/util.js'
import $ from 'jquery'
export default {
  name: 'Register',
  components: {
    tips
  },
  data () {
    return {
      tellPhoneNum: '',
      tellCode: '',
      time: 60,
      btnTitle: '获取短信验证码',
      disbaled: false,
      tipMsg: '手机号不正确',
      tipShow: false,
      icon: 'error'
    }
  },
  mounted () {
    $('input').blur(function () {
      setTimeout(function () {
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 300);
    });
    // this.getAute();
  },
  watch: {
    tipShow () {
      if (this.tipShow) {
        setTimeout(() => {
          this.tipShow = false;
        }, 2000)
      }
    }
  },
  methods: {
    // 没有授权、没有code
    // async getAute () {      
    //     let param = {
    //       share_id: utils.getUrlKey('share_id'),
    //     }
    //   let res = (await getInviteLogin(param)).data;
    //   if (res.code === 1) {
    //     if (res.user_target === 1) {
    //       this.$router.push('MembershipCenter')
    //     }
    //     if (res.user_target === 2) {
    //       this.$router.push('BasicInfo')
    //     }
    //     // if (res.user_target === 3) {}
    //     if (res.user_target === 4) {
    //       window.location.href = res.authorize_url;
    //     }
    //   } else {
    //     console.log('失败')
    //   }
    // },
    async submit () {
      if (this.trim(this.tellPhoneNum).length !== 0) {
        if (this.trim(this.tellCode).length === 0) {
          this.tipShow = true;
          this.tipMsg = '请输入验证码'
        } else {
          let registerInfo = await register({
            mobile: this.tellPhoneNum,
            code: this.tellCode,
            source:sessionStorage.getItem('source'), // // 来源 钒钛
          })
          let res = registerInfo.data
          if (res.code === 1) {
            if (res.user_info.is_complete === 1) { // 已完善
              if (res.user_target) {
                this.$router.push('GetCoupon?sid=' + res.sid)
              } else {
                this.$router.push('MembershipCenter')
              }
            }else{
              // this.$router.push('BasicInfo')
              this.$router.push('MembershipCenter')
            }
          } else if(res.code === 6){  // 去跳到户外宝
            window.location.href = res.url
          }else if(res.code === 7){  // 去跳到户外宝 为空状态
            this.$router.push('End')
          }else {
            this.tipShow = true;
            this.tipMsg = res.msg;
          }
        }
      }
    },
    trim (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '')
    },
    async getCode () {
      if (this.disbaled === false) {
        if (this.trim(this.tellPhoneNum).length === 0) {
          this.tipShow = true;
          this.tipMsg = '请输入手机号'  
        } else if (!(/^1\d{10}$/.test(this.tellPhoneNum))) {
          this.tipShow = true;
          this.tipMsg = '请输入正确手机号'
        } else {
          let codeInfo = await getSmsCode({mobile: this.tellPhoneNum})
          this.tipShow = true;
          this.tipMsg = codeInfo.data.msg;
          if (codeInfo.data.code === 1) {
            this.icon = 'success';
            this.time = 60;
            let timer = setInterval(() => {
              if (this.time > 0) {
                this.time = this.time - 1;
                this.btnTitle = this.time + 's';
                this.disbaled = true
              } else {
                clearInterval(timer);
                this.btnTitle = '获取短信验证码'
                this.disbaled = false
              }
            }, 1000)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/common";
.clearfix::after{
  display:block;
  content:"";
  clear:both;
  overflow:hidden;
}
.Register{
  .Register-up{
    position:relative;
    .Register-up-img{
      width:100%;
    }
    .Register-up-text-box{
      position:absolute;
      left:30px;
      right:30px;
      bottom:38px;
      border:1px solid rgba(255,255,255,0.05);
      padding:6px;
      //height:158px;
      .Register-up-text-box-inner{
        box-sizing:padding-box;
        width:100%;
        height:100%;
        background:rgba(216,216,216,0.05);
        color:#ffffff;
        text-align:center;
        .Register-up-title{
          font-family: PingFangSC-Semibold;
          font-size:24px;
          color: #FFFFFF;
          letter-spacing: 0;
          line-height:22px;
          padding:25px 15px 10px;
        }
        .Register-up-text{
          font-family: PingFangSC-Light;
          font-size:14px;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.6px;
          text-align: center;
        }
        .Register-up-vip-img{
          margin:20px 0;
          width:56px;
          height:26px;
        }
      }
    }
  }
  .Register-center{
    padding:0 20px;
    position:relative;
    .Register-center-tell-box{
      .Register-center-tell-item{
        border-bottom: 1px solid rgba(27,30,33,0.12);
        margin-top:30px;
        .Register-center-tell-item-input{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #1B1E21;
          letter-spacing: 0;
          padding:10px 0;
          display:inline-block;
          width:100%;
          outline:none;
          border:none;
          background: none;
        }
        .Register-center-item-input{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #1B1E21;
          letter-spacing: 0;
          padding:10px 0;
          float:left;
          outline:none;
          border:none;
          background: none;
        }
        .Register-center-item-btn{
          padding:10px 0;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #B88969;
          letter-spacing: 0;
          text-align: right;
          line-height: 12px;
          border:none;
          outline:none;
          background:none;
          float:right;
        }
      }
      input::-webkit-input-placeholder{
        color:rgba(27,30,33,0.2);
      }
      input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:rgba(27,30,33,0.2);
      }
      input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:rgba(27,30,33,0.2);
      }
      input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:rgba(27,30,33,0.2);
      }
    }
  }
  .Register-down{
    padding:0 20px;
    margin-top:70px;
    .Register-down-btn{
      height:54px;
      line-height:54px;
      text-align:center;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color:#ffffff;
      background: #1B1E21;
      border-radius: 27px;
    }
    .disable-btn{
      opacity: 0.1;
    }
  }
}
</style>
