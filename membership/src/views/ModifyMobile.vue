<template>
  <div class="modify-mobile">
    <div class="info">
      <input v-model="tellPhoneNum" class="input" value="" type="" placeholder="请输入手机号"/>
    </div>
    <div class="info">
      <input v-model="tellCode" class="input"  maxlength="6" placeholder="请输入验证码"/>
      <div @click="getCode" class="code-class">{{ this.btnTitle }}</div>
    </div>
    <div class="info-submit">
      <div @click="submitInfo" class="submit-btn " :class="{'disable-btn':!trim(tellPhoneNum).length>0}">确认修改</div>
    </div>
    <transition name="fade">
      <tips :tipMsg="tipMsg" v-show="tipShow" transiton="fade" :icon="icon"></tips>
    </transition>
  </div>
</template>

<script>
import { getSmsCode, editMobile, loadError } from '@/api/index'
import tips from '../components/Tips'
import $ from 'jquery'
export default {
  name: 'ModifyMobile',
  components: {
    tips
  },
  data () {
    return {
      btnTitle: '获取短信验证码',
      tellPhoneNum: '',
      tellCode: '',
      tipMsg: '手机号不正确',
      tipShow: false,
      icon: 'error',
      disbaled: false,
      time: 60,
      loadError: false
    }
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
  mounted () {
    $('input').blur(function () {
      setTimeout(function () {
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 300);
    });
  },
  methods: {
    async submitInfo () {
      if (this.trim(this.tellPhoneNum).length !== 0) {
        if (this.trim(this.tellCode).length === 0) {
          this.tipShow = true;
          this.tipMsg = '请输入验证码'
        } else {
          let registerInfo = await editMobile({
            mobile: this.tellPhoneNum,
            code: this.tellCode
          })
          let res = registerInfo.data
          this.loadError = loadError;
          if (this.loadError) {
            this.tipShow = true;
            this.tipMsg = '修改失败'
          }
          if (res.code === 1) {
            this.tipShow = true;
            this.tipMsg = '修改成功';
            let self = this;
            setTimeout(() => {
              self.$router.push('MemberInfo');
            }, 1500)
          } else {
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
          if (codeInfo.data.code === 1) {
            this.icon = 'success'
            this.tipShow = true;
            this.tipMsg = codeInfo.data.msg;
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
          } else {
            this.tipShow = true;
            this.tipMsg = codeInfo.data.msg;
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/common";
.modify-mobile{
  padding:0 20px;
  position:relative;
  .info{
    height:24px;
    line-height:24px;
    padding-top:40px;
    display:flex;
    border-bottom:0.5px solid rgba(27,30,33,0.12);
    padding-bottom:1px;
    .input{
      flex:1;
      font-size:14px;
      font-family: PingFangSC-Regular;
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
    .code-class{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #B88969;
    }
    .content{
      font-family: PingFangSC-Light;
      flex:1;
      text-align:right;
      height:55px;
      font-size: 14px;
      color: #1B1E21;
    }
  }
  .info-submit{
    padding:0 20px;
    margin-top:100px;
    .submit-btn{
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
