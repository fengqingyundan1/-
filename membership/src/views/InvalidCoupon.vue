<template>
  <div class="coupon">
    <!--优惠券列表start-->
    <ul v-if="invalidList.length>0&&isLoading==false" class="coupon-ul">
      <li v-for="(detail,index) in invalidList" :key="index"  class="list">
        <div class="list-top1">
          <div class="list-left">
            <p v-if="detail.vouchertype=='ZKQ'" class="money">{{parseFloat(detail.YLZD4).toFixed(1)}}<span class="money-icon">折</span></p>
            <p v-else class="money"><span class="money-icon">¥</span>{{parseFloat(detail.YLZD2)}}</p>
            <p class="text" v-if="detail.vouchertype=='MJQ'">满¥{{parseFloat(detail.YLZD3)}}可用</p>
            <p class="text" v-else>无门槛</p>
          </div>
          <div class="list-right">
            <div class="border-b">
              <p class="title">{{detail.YLZD1}}</p>
            </div>
            <div class="detail">
              <div class="detail-left">
                <span class="time">{{formatTime(detail.voucherstarttime)}}-{{formatTime(detail.voucherendtime)}}</span>
              </div>
              <div class="detail-right">
                <span  @click="showDetail(index)">详细信息</span>
                <img v-if="isShowDescribe(index)" src="../assets/images/arrow-up.png"/>
                <img v-else src="../assets/images/arrow-down.png"/>
              </div>
              <div class="marker" v-if="detail.statesdesc === '已过期'">
                <!--已过期-->
                <img class="marker-icon" src="../assets/images/active-end.png" alt="">
              </div>
              <div class="marker" v-if="detail.statesdesc === '已使用'">
                <!--已使用-->
                <img class="marker-icon" src="../assets/images/used-coupon.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="describe" v-show="isShowDescribe(index)">
          <p>{{detail.describe}}</p>
        </div>
      </li>
    </ul>
    <!--优惠券列表end-->
    <!--特权码列表start-->
    <ul v-if="invalidCodeList.length>0&&isLoading==false" class="promocode-ul">
      <li v-for="(detail,index) in invalidCodeList" :key="index" :class="isCanUse === true  ?'orange':'gray'" class="list">
        <div class="list-top1">
          <div class="list-up">
            <div class="list-up-left">
              <div class="border-b">
                <p class="title">{{detail.preference_code}}</p>
              </div>
            </div>
            <div class="list-up-right">
              <p class="text" v-if="detail.discount_type=='2'">{{detail.use_condition}}</p>
              <p class="text" v-else>{{detail.use_condition}}</p>
              <p class="money-icon" v-if="detail.discount_type=='1'">折</p>
              <p class="money-icon" v-else>¥</p>
              <p v-if="detail.discount_type=='1'" class="money">{{detail.discount_value}}</p>
              <p v-else class="money">{{parseFloat(detail.reduce_money)}}</p>
            </div>
          </div>
          <div class="list-down">
            <div class="list-down-left">
              <span class="detail-text"  @click="showDetail(index)">详细信息</span>
              <img v-if="isShowDescribe(index)" src="../assets/images/arrow-up.png"/>
              <img v-else src="../assets/images/arrow-down.png"/>
              <div class="marker" v-if="detail.statesdesc === '已过期'">
                <!--已过期-->
                <img class="marker-icon" src="../assets/images/active-end.png" alt="">
              </div>
              <div class="marker" v-if="detail.statesdesc === '已使用'">
                <!--已使用-->
                <img class="marker-icon" src="../assets/images/used-coupon.png" alt="">
              </div>
            </div>
            <div class="list-down-right">
              <span class="time">{{formatTime(detail.start_time)}}-{{formatTime(detail.end_time)}}</span>
            </div>
          </div>
        </div>
        <div class="describe" v-show="isShowDescribe(index)">
          <!--<p>使用说明：</p>-->
          <p>{{detail.describe}}</p>
        </div>
      </li>
    </ul>
    <p v-if="invalidCodeList.length==0&&invalidList.length==0&&isLoading==false" style="text-align: center;margin-top:20px;">
      <img class="no-data" src="../assets/images/no-data.png" alt="">
    </p>
    <!--特权码列表end-->
    <div class="viewCouponBox" v-if="!isLoading">
      <div  @click="changeUsed" class="viewCoupon">查看可用的券/码 <img class="arrow-right" src="../assets/images/arrow-right.png" alt=""></div>
    </div>
    <button-bottom text='领劵中心' href='GetCoupon'></button-bottom>
    <transition name="fade">
      <tips :tipMsg="tipMsg" v-show="tipShow" transiton="fade" :icon="icon"></tips>
    </transition>
    <div class="is-loading" v-if="isLoading">
      <img src="../assets/images/loading.png"/>
      <p>数据加载中，请稍后...</p>
    </div>
  </div>
</template>

<script>
  import {getCoupon,getCode} from '@/api/index'
  import utils from '@/utils/util.js'
  import ButtonBottom from '@/components/ButtonBottom.vue'
  import moment from 'moment';
  import tips from '../components/Tips'
  import ClipboardJS from 'clipboard';
  export default {
    name: 'InvalidCoupon',
    components: {
      ButtonBottom,
      tips
    },
    data () {
      return {
        alert: {
          show: false,
          bar: '',
          qr: '',
          voucherno: '',
          YLZD1: ''
        },
        detailIndexList: [],
        invalidList:[],//失效券
        invalidCodeList:[],//失效码
        isCanUse:true,//是否在可用券页面
        isCoupon:true,//是否点击了优惠券tab
        tipMsg: '特权码不能为空',
        tipShow: false,
        icon: 'error',
        isLoading: true
      }
    },
    activated () {
      this.isCanUse = true;
      this.isCoupon = true;
      this.getCouponList();
      this.getCodeList();
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
    //获取优惠券列表
    async getCouponList () {
      let res = (await getCoupon()).data;
      if (res.code === 1) {
        this.invalidList = res.data.invalid_list;
      } else {
        this.invalidList = [];
      }
      this.isLoading = false;
    },
    //获取特权码列表
    async getCodeList () {
      let res = (await getCode()).data;
      console.log(res.data.invalid_list);
      if (res.code === 1) {
        this.invalidCodeList = res.data.invalid_list;
      } else {
        this.invalidCodeList = [];
      }
    },
    //查看可用的券
    changeUsed(){
    this.$router.push({path:'/Coupon'});
    },
    // 弹窗二维码
    isAlertCode(show,bar,qr,voucherno,YLZD1){
      this.alert.show = show
      this.alert.bar = bar
      this.alert.qr = qr
      this.alert.voucherno = voucherno
      this.alert.YLZD1 = YLZD1
    }
  },

  }
</script>

<style scoped lang="less">
  @import "../assets/common";
  .coupon{
    padding:0 0 180px 0;
    position:relative;
    background:#f7f7f7;
    height:100%;
    box-sizing:border-box;
  .tips-dialog{
    top:280px;
  }
  .no-data{
    width:200px;
    height:200px;
  }
  .coupon-ul{
    background:#f7f7f7;
  .list{
    padding-top:30px;
    position:relative;
  .list-top1{
    width: 345px;
    height: 100px;
    background:url('../assets/images/coupon-bg.png') no-repeat;
    background-size: 100% 100%;
    /*border:1px dashed #cccccc;*/
    margin: auto;
    .list-left{
      margin-top: 20px;
      .text{
        color:rgba(35, 24, 21,0.6);
      }
    }
    .title{
      margin-top: 16px;
      color:rgba(35, 24, 21,0.6);
    }
    .time{
      margin-bottom:6px;
    }
  .list-right .detail{
    margin:0;
  }
  }
  .list-left{
    float:left;
    width:30%;
    text-align: center;
  .money{
    font-family: Impact;
    font-size: 36px;
    line-height:50px;
    color:rgba(153,153,153,1);
    position:relative;
  .money-icon{
    position:absolute;
    top:-3px;
    right:15px;
    font-size:10px;
    line-height:10px;
    color:#231815;
  }
  }
  .text{
    font-size: 12px;
    color:rgba(35,24,21,0.6);
  }
  }
  .list-right{
    box-sizing: border-box;
    float:left;
    width: 70%;
    padding-left:10px;
  /*position:relative;*/
  .border-b{
    /*border-bottom:1px solid rgba(27,30,33,0.12);*/
    /*width:161px*/
  }
  .title{
    font-family: PingFangSC-Medium;
    font-size: 15px;
    color: #231815;
    font-weight:bold;
    margin-top:20px;
    /*margin-bottom:3px;*/
    /*margin-top:20px;*/
  }
  .time{
    font-family: PingFangSC-Light;
    font-size: 10px;
    color:rgba(35,24,21,1);
    margin-bottom:10px;
  }
  .detail{
    font-size:10px;
    font-family:PingFangSC-Light;
    color:rgba(27,30,33,0.8);
    margin:10px 0 13px 0;
    display:flex;
    justify-content: space-between;
    padding-top:10px;
  .detail-left{
    span{
      height: 30px;
      line-height: 30px;
      font-size: 10px;
    }
  }
  .detail-right{
    text-align:center;
    flex:1;
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
  }
  .marker{
    position:absolute;
    top:30px;
    right:12px;
    .marker-icon{
      width:60px;
    }
  }
  }
  }
  .describe{
    padding:0 22px ;
    margin-top:12px;
    font-size:12px;
    font-family:PingFangSC-Light;
  }
  }
  }
  }
  .promocode-ul{
    background:#f7f7f7;
    .list {
      padding-top: 30px;
      position: relative;
      .list-top1{
        width: 345px;
        height: 100px;
        background:url('../assets/images/code-bg.png') no-repeat;
        background-size: 100% 100%;
        margin: auto;
        .list-up{
          display:flex;
          padding:0 24px;
          height:66px;
          .list-up-left{
            color:red;
            box-sizing: border-box;
            width: 50%;
            .border-b{
              .title{
                font-family: PingFangSC-Medium;
                font-size: 15px;
                color: #231815;
                font-weight:bold;
                margin-top:20px;
              }
            }
          }
          .list-up-right{
            width:50%;
            display:flex;
            justify-content:space-between;
            text-align:right;
            .money{
              font-family: Impact;
              font-size: 36px;
              line-height:50px;
              color:rgba(35, 24, 21,0.6);
              align-self: flex-end;
            }
            .money-icon{
              font-size:10px;
              line-height:10px;
              color:#231815;
              padding-top:12px;
            }
            .text{
              font-size: 12px;
              flex:1;
              align-self:flex-end;
              padding-bottom:10px;
              color:rgba(35, 24, 21,0.6);
            }
          }
        }
        .list-down{
          display:flex;
          align-items:center;
          padding:0 24px;
          height:34px;
          .list-down-left{
            flex:1;
            .detail-text{
              font-size:10px;
              line-height:10px;
             color:rgba(35,24,21,0.8);
            }
            img{
              width:10px;
              margin-top:6px;
              line-height: 30px
            }
            .marker{
              position:absolute;
              top:30px;
              right:12px;
              .marker-icon{
                width:60px;
              }
            }
          }
          .list-down-right{
            font-size:12px;
            color:#1a1824;
            .time{
              color:rgba(26,24,36,1);
              font-size:10px;
            }
          }
        }
      }
      .describe{
        padding:0 22px ;
        margin-top:12px;
        font-size:12px;
        /*color:rgba(27,30,33,0.8);*/
        font-family:PingFangSC-Light;
      }
    }
  }
  .viewCouponBox{
    padding:50px 0 100px;
    background:#F7F7F7;
    text-align:center;
  .viewInvalid{
    font-size:14px;
    color:rgba(35,24,21,0.6);
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
  }
  .viewCoupon{
    font-size:14px;
    color:rgba(35,24,21,1);
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:bold;
  }
  .arrow-right{
    height:8px;
  }
  }
  .alert-code{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.59);
    z-index: 2;
  .box{
    width:336px;
    height:426px;
    background:rgba(255,255,255,1);
    border-radius:6px;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
  }
  .title{
    font-family: PingFangSC-Medium;
    font-size: 15px;
    color: #231815;
    font-weight:bold;
    margin-top:20px;
  }
  .close-black{
    width: 15px;
    position: absolute;
    right: 18px;
    top:24px;
  }
  .bar{
    margin-top: 18px;
    width:300px;
    background:rgba(255,255,255,1);
    box-shadow:0px 15px 15px 0px rgba(0,0,0,0.21);
  }
  .voucherno{
    font-size:15px;
    font-family:FZLTCHJW--GB1-0,FZLTCHJW--GB1;
    font-weight:normal;
    color:rgba(0,0,0,1);
    margin-top: 8px;
  }
  .qr{
    width: 200px;
    margin-top: 20px;
  }
  .desc{
    font-size:12px;
    color:rgba(51,51,51,1);
  }
  }
</style>

