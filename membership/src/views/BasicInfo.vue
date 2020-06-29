<template>
  <div class="basic-info">
    <div class="info-bg">
      <div class="bg-color"></div>
      <div class="bg-img">
        <img src="../assets/images/vip-bg.png"/>
        <!--<p class="text">填写真实会员信息奖励<span>50</span>积分</p>-->
        <p class="text">探路者会员中心邀您填写会员信息</p>
      </div>
    </div>
    <div class="content-bg">
      <div class="content">
        <div class="info">
          <input v-model="name" class="input" value="" type="" placeholder="请填写姓名"/>
        </div>
        <div class="info">
          <div class="selectDate" :class="{'changeClass':isValue}" id="dateShowBtn" :data-default="defaultDate">{{birthday}}</div>
          <span class="info-tip">会员权益，不支持修改</span>
        </div>
        <div class="info-submit">
          <div @click="submitInfo" class="submit-btn " :class="{'disable-btn':name !=='' && birthday !==''}">
            <span v-if="!isLoading">提交</span>
            <img src="../assets/images/loading1.png" class="loading-img" v-if="isLoading"/>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <tips :tipMsg="tipMsg" v-show="tipShow" transiton="fade" :icon="icon"></tips>
    </transition>
  </div>
</template>

<script>
import {updateInfo} from '@/api/index'
import utils from '@/utils/util.js'
import tips from '../components/Tips'
import $ from 'jquery'
import moment from 'moment';
export default {
  name: 'BasicInfo',
  components: {
    tips
  },
  data () {
    return {
      name: '',
      birthday: '请选择出生日期',
      isValue: false,
      defaultDate: '2019-03-01',
      tipMsg: '保存成功',
      tipShow: false,
      icon: 'error',
      isLoading:false
    }
  },
  activated () {
    $('input').blur(function () {
      setTimeout(function () {
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 300);
    });
    this.isValue = false;
    this.defaultDate = moment().format('YYYY-MM-DD');
  },
  mounted () {
    let self = this;
    new Mdate('dateShowBtn', {
      acceptId: 'dateShowBtn',
      beginYear: '1920',
      beginMonth: '',
      beginDay: '',
      endYear: '',
      endMonth: '',
      endDay: '',
      format: '-',
      onDateSure: function (res) {
        self.birthday = res;
        self.defaultDate = res;
        self.isValue = true;
      }
    })
    console.log('初始化')
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
    async submitInfo () {
      if (this.name !== '' && this.birthday !== '' && !this.isLoading) {
        this.isLoading = true;
        let par = {
          action: 'register',
          name: this.name,
          birthday: this.birthday,
          source:sessionStorage.getItem('source')
        }
        const res = await updateInfo(par);
        console.log(res)
        if (res.data.code === 1) {
          this.isLoading = false;
          if (res.data.user_target) {
            this.$router.push('GetCoupon?sid=' + res.data.sid)
          } else {
            this.$router.push('MembershipCenter?uid=' + utils.getUrlKey('uid'))
          }
        }else if(res.data.code === 6){  // 去跳到户外宝
          window.location.href = res.data.url
        } else {
          this.isLoading = false;
          this.tipShow = true;
          this.tipMsg = res.data.msg;
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/common";
  .basic-info{
    // position:relative;
    height:100%;
    .content-bg{
      .content{
        .info{
          padding-top:30px;
          height:33px;
          line-height:33px;
          border-bottom:0.5px solid rgba(27,30,33,0.12);
          display: flex;
          .selectDate{
            flex:1;
            font-size:14px;
            color:rgba(27,30,33,0.2);
            // font-family: PingFangSC-Regular;
          }
          .changeClass{
            font-size:14px;
            font-weight:500;
            color:rgba(27,30,33,1);
            // font-family: PingFangSC-Medium;
          }
          .input{
            // font-family: PingFangSC-Medium;
            font-size: 14px;
            color:rgba(27,30,33,1);
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
        .info-tip{
          padding:10px 0;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #B88969;
          text-align: right;
          line-height: 12px;
          float:right;
        }
      }
      .info-submit{
        margin-top:210px;
        position:relative;
        .loading-img{
          position:absolute;
          top:11px;
          left:50%;
          margin-left:-16px;
          -webkit-transform: rotate(360deg);
          animation: rotation 3s linear infinite;
          -moz-animation: rotation 3s linear infinite;
          -webkit-animation: rotation 3s linear infinite;
          -o-animation: rotation 3s linear infinite;
        }
        @-webkit-keyframes rotation{
          from {-webkit-transform: rotate(0deg);}
          to {-webkit-transform: rotate(360deg);}
        }
        .submit-btn {
          height:54px;
          line-height:54px;
          text-align:center;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color:rgba(27,30,33,0.6);
          background: rgba(232,232,232,1);
          border-radius: 27px;
        }
        .disable-btn{
          background: rgba(27,30,33,1);
          color:#ffffff;
        }
      }
    }
  }
</style>
