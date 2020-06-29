<template>
<div class="coupon">
  <ul class="coupon-ul" v-if="couponList.length>0">
    <li v-for="(detail,index) in couponList" :key="index" :class="detail.voucherstate==='未使用'?'orange':'gray'" class="list">
      <div class="list-top">
        <!-- 1现金券 -->
        <div class="list-left" v-if='detail.type === "1" && detail.is_lq === 0'>
          <p class="money active"><span class="money-icon">¥</span>{{parseFloat(detail.value)}}</p>
          <p class="text active">无门槛</p>
        </div>
        <div class="list-left" v-if='detail.type === "1" && detail.is_lq === 1'>
          <p class="money"><span class="money-icon">¥</span>{{parseFloat(detail.value)}}</p>
          <p class="text">无门槛</p>
        </div>
        <!-- 2 满减券-->
        <div class="list-left" v-if='detail.type === "2" && detail.is_lq === 0'>
          <p class="money active"><span class="money-icon">¥</span>{{parseFloat(detail.value)}}</p>
          <p class="text active">满¥{{parseFloat(detail.satisfy)}}可用</p>
        </div>
        <div class="list-left" v-if='detail.type === "2" && detail.is_lq === 1'>
          <p class="money"><span class="money-icon">¥</span>{{parseFloat(detail.value)}}</p>
          <p class="text">满¥{{parseFloat(detail.satisfy)}}可用</p>
        </div>
        <!--3 折扣券 -->
        <div class="list-left" v-if='detail.type === "3" && detail.is_lq === 0'>
          <p class="money active">{{parseFloat(detail.value).toFixed(1)}}<span class="money-icon">折</span></p>
          <p class="text active">无门槛</p>
        </div>
        <div class="list-left" v-if='detail.type === "3" && detail.is_lq === 1'>
          <p class="money">{{parseFloat(detail.value).toFixed(1)}}<span class="money-icon">折</span></p>
          <p class="text">无门槛</p>
        </div>
        <div class="list-right">
          <div>
            <p class="title">{{detail.title}}</p>
            <p class="time" v-if="detail.use_opt === '1'">{{formatTime(detail.starttime)}}-{{formatTime(detail.endtime)}}</p>
            <p class="time" v-if="detail.use_opt === '2'">领取后{{detail.use_day}}天内可用</p>
          </div>
          <div class="detail">
            <span  @click="showDetail(index)">详细信息</span>
            <img v-if="isShowDescribe(index)" src="../assets/images/arrow-up.png"/>
            <img v-else src="../assets/images/arrow-down.png"/>
            <div class="marker active" v-if="detail.is_lq === 0" @click="pickupCoupon(detail)">立即领取</div>
            <div class="marker" v-if="detail.is_lq === 1">已领取</div>
          </div>
        </div>
      </div>
      <div class="describe" v-show="isShowDescribe(index)">
        <p>{{detail.describe}}</p>
        <!--<p>使用说明：</p>-->
        <!--<p>1.优惠券过期未使用将自动作废；</p>-->
        <!--<p>2.少量特殊商品不能使用优惠券（具体商品以店内政策为准）；</p>-->
        <!--<p>3.使用优惠券的订单发生退货退款后，优惠券不返还；</p>-->
        <!--<p>4.最终解释权归探路者所有。</p>-->
      </div>
    </li>
  </ul>
  <p v-else style="text-align: center;padding-top:20px;">暂无领取的优惠券～～</p>
  <button-bottom text='会员中心' href='MembershipCenter'></button-bottom>
  <div class="is-loading" v-if="isLoading">
    <img src="../assets/images/loading.png"/>
    <p>数据加载中，请稍后...</p>
  </div>
</div>
</template>

<script>
import {receiveCoupon, pickupCoupon} from '@/api/index'
import ButtonBottom from '@/components/ButtonBottom.vue'
import utils from '@/utils/util.js'
import moment from 'moment';
export default {
  name: 'GetCoupon',
  components:{
    ButtonBottom
  },
  data () {
    return {
      couponList: [],
      detailIndexList: [],
      isLoading: true,
    }
  },
  mounted () {
    this.receiveCouponList();
  },
  methods: {
    formatTime (time) {
      return moment(time).format('YYYY.MM.DD');
    },
    isShowDescribe (index) {
      return this.detailIndexList.includes(index);
    },
    showDetail (index) {
      if (this.detailIndexList.includes(index)) {
        this.detailIndexList = this.detailIndexList.filter(i => {
          return i !== index;
        })
      } else {
        this.detailIndexList.push(index)
      }
    },
    async receiveCouponList () {
      const parms = {
          sid:utils.getUrlKey('sid')
      }
      let res = (await receiveCoupon(parms)).data;
      console.log(res)
      if(res.code === 1){
        this.couponList = res.data
      }else if (res.code === 0 && res.msg === '请先完善信息') {
        this.$router.push('Register');
      }
      this.isLoading = false;
    },
    async pickupCoupon(obj){
        const parms = {
            sid:obj.id
        };
        obj.is_lq = 1;
        let res = (await pickupCoupon(parms)).data;
        if(res.code !== 1){
           obj.is_lq = 0;
           alert('领取失败，稍后再试')
        }else{
          alert(res.msg);
        }
        console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
  @import "../assets/common";
.coupon{
  padding:0 0 100px 0;
  background:#f7f7f7;
  height:100%;
  .tabUl{
    overflow: hidden;
    padding:0 20px;
    .tabs{
      display:inline-block;
      width:33.3%;
      text-align:center;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color:rgba(27,30,33,0.4);
      p{
        margin-bottom:24px;
      }
      .line{
        width:20px;
        height:4px;
        background: #1B1E21;
        margin:0 auto;
      }
    }
    .tabsActive{
      color:rgba(27,30,33,1);
      font-family: PingFangSC-Medium;
      font-size: 20px;
    }
  }
  .division-line{
    width:100%;
    height:8px;
    background: rgba(27,30,33,0.04);
  }
  .coupon-ul{
    padding:0 20px 120px;
    background:#f7f7f7;
    .orange{
      .money{
        color:rgba(216,111,40,1) !important;
      }
    }
    .gray{
      //background:gray;
    }
    .list{
      padding-top:30px;
      position:relative;
      //height:138px;
      .list-top{
        overflow: hidden;
        background:url('../assets/images/coupon-bg.png') no-repeat;
        background-size: 100% 100%;
        /*border:1px dashed #cccccc;*/
        height: 100px;
        /*padding:28px 10px 0 0;*/
        display: flex;
        align-items: center;
      }
      .list-left{
        float:left;
        width:30%;
        text-align: center;
        /*margin-top: -20px;*/
        .money{
          font-family: Impact;
          font-size: 36px;
          line-height:50px;
          /*font-size: 38px;*/
          /*line-height:58px;*/
          color:rgba(153,153,153,1);
          position:relative;
          .money-icon{
            position:absolute;
            top:-1px;
            right:15px;
            font-size:12px;
            line-height:12px;
            color:#231815;
          }
          &.active{
              color:rgba(216,111,40,1);
          }
        }
        .text{
          font-size: 14px;
          color:rgba(153,153,153,1);
          &.active{
              color:rgba(27,30,33,1);
          }
        }
      }
      .list-right{
        box-sizing: border-box;
        float:left;
        width: 70%;
        padding-left:20px;
        .title{
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #1B1E21;
          margin-top: 24px;
          /*margin-bottom:3px;*/
        }
        .time{
          display:inline-block;
          font-family: PingFangSC-Light;
          font-size: 10px;
          padding-bottom:3px;
          color:rgba(27,30,33,0.8);
          border-bottom:1px solid rgba(27,30,33,0.12);
          /*margin-bottom:10px;*/
        }
        .detail{
          font-size:10px;
          font-family:PingFangSC-Light;
          color:rgba(27,30,33,0.8);
          margin:0px 0 13px 0;
          // width: 45%;
          span{
            height: 30px;
            line-height: 30px;
            font-size: 10px;
          }
          img{
            width:10px;
            margin-top:6px;
            line-height: 30px
          }
          .marker{
            float: right;
            width:95px;
            height:30px;
            background:rgba(153,153,153,1);
            box-shadow:0px 1px 6px 0px rgba(153,153,153,1);
            border-radius:13px;
            font-size:15px;
            font-family:FZLTCHJW--GB1-0,FZLTCHJW--GB1;
            font-weight:normal;
            color:rgba(255,255,255,1);
            line-height:30px;
            text-align: center;
            &.active{
                background:rgba(216,111,40,1);
                box-shadow:0px 1px 6px 0px rgba(216,111,40,1);
                color:rgba(255,255,255,1);
            }
          }
        }
      }
      .show-code-box{
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(216,111,40,1);
        font-size: 12px;
        padding: 14px 0;
        height: 18px;
        .code-img{
          width: 18px;
          vertical-align:middle;
        }
        p{
          display: inline-block;
          line-height: 18px;
          margin-left: 6px;
        }
      }
      .describe{
        padding:0 22px ;
        margin-top:12px;
        font-size:12px;
        color:rgba(27,30,33,0.8);
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*display: -webkit-box;*/
        /*-webkit-line-clamp: 3;*/
        /*-webkit-box-orient: vertical;*/
        font-family:PingFangSC-Light;
      }

    }
  }
}
</style>
