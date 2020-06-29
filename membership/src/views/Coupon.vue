<template>
<div class="coupon">
  <div class="exChange-box" v-if="!isLoading">
    <div class="exChange" >
      <input class="ex-input"  type="text" value="" v-model="convertText" placeholder="请输入特权码名称兑换">
      <input class="ex-btn"  type="button" value="兑换" @click="convert">
    </div>
    <!--<div class="copy-box" id="id" @click="paste">-->
      <!--<img class="copy-btn" src="../assets/images/copy-icon.png" alt="">-->
      <!--<span class="copy-text">粘贴特权码</span>-->
    <!--</div>-->
  </div>
  <ul class="tabUl" v-if="!isLoading">
    <li class="tabs" v-for="(tab,i) in tabs" :key="i"
         :class="[tabIndex === tab.index ? 'tabsActive' : '']"
         @click="changeSelectTab(tab.index)">
      <p :class="tabIndex === tab.index?'line':''">{{tab.name}}({{tab.num}})</p>
      <!--<div class="line" v-if="tabIndex === tab.index"></div>-->
    </li>
  </ul>
  <!--<div class="division-line"></div>-->
  <!--优惠券列表start-->
  <ul v-if="couponList.length>0&&isCoupon==true&&isLoading==false" class="coupon-ul">
    <li v-for="(detail,index) in couponList" :key="index" :class="isCanUse === true  ?'orange':'gray'" class="list">
      <div :class=" isCanUse === true ?'list-top1':'list-top'">
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
          <div class="show-code-box"
               v-if="tabIndex === 0 && isCanUse==true"
               @click='isAlertCode(true,detail.bar_code,detail.qr_code,detail.voucherno,detail.YLZD1)'>
            <p>点击此处展示核销码</p>
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
        <!--<p>使用说明：</p>-->
        <!--<p>1.优惠券过期未使用将自动作废；</p>-->
        <!--<p>2.少量特殊商品不能使用优惠券（具体商品以店内政策为准）；</p>-->
        <!--<p>3.使用优惠券的订单发生退货退款后，优惠券不返还；</p>-->
        <!--<p>4.最终解释权归探路者所有。</p>-->
      </div>
    </li>
  </ul>
  <p v-if="couponList.length==0&&isCoupon==true&&isLoading==false" style="text-align: center;margin-top:20px;">
    <img class="no-data" src="../assets/images/no-data.png" alt="">
  </p>
  <!--优惠券列表end-->
  <!--特权码列表start-->
  <ul v-if="couponList.length>0&&isCoupon==false&&isLoading==false" class="promocode-ul">
    <li v-for="(detail,index) in couponList" :key="index" :class="isCanUse === true  ?'orange':'gray'" class="list">
      <div :class=" isCanUse === true ?'list-top1':'list-top'">
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
  <p v-if="couponList.length==0&&isCoupon==false&&isLoading==false" style="text-align: center;margin-top:20px;">
    <img class="no-data" src="../assets/images/no-data.png" alt="">
  </p>
  <!--特权码列表end-->
  <div class="viewCouponBox" v-if="!isLoading">
    <div v-if="isCanUse" @click="changeInvalid" class="viewInvalid">查看失效的券/码 <img class="arrow-right" src="../assets/images/arrow-right.png" alt="">  </div>
    <div v-else @click="changeUsed" class="viewCoupon">查看可用的券/码 <img class="arrow-right" src="../assets/images/arrow-right.png" alt=""></div>
  </div>
  <div class="alert-code" v-show="alert.show">
    <div class="box">
      <p class="title">{{alert.YLZD1}}</p>
      <img src="../assets/images/close-black.png" alt="" class="close-black" @click=' isAlertCode(false)'>
      <img :src="alert.bar" alt="" class="bar">
      <p class="voucherno">{{alert.voucherno}}</p>
      <img :src="alert.qr" alt="" class="qr">
      <p class="desc">请向收银员出示此核销码</p>
    </div>
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
import {getCoupon,convertCode,getCode} from '@/api/index'
import utils from '@/utils/util.js'
import ButtonBottom from '@/components/ButtonBottom.vue'
import moment from 'moment';
import tips from '../components/Tips'
import ClipboardJS from 'clipboard';
export default {
  name: 'Coupon',
  components: {
    ButtonBottom,
    tips
  },
  data () {
    return {
      tabs:[
        {
          name:'优惠券',
          index:0,
          num:'0',
        },
        {
          name:'特权码',
          index:1,
          num:'0',
        }
      ],
      alert: {
        show: false,
        bar: '',
        qr: '',
        voucherno: '',
        YLZD1: ''
      },
      tabIndex: 0,
      noUsed: [],//有效券
      noUsedCode: [],//有效码
      couponList: [],//优惠券/码显示列表
      QcouponList:[],//优惠券列表
      codeList:[],//特权码列表
      detailIndexList: [],
      invalidList:[],//失效券
      invalidCodeList:[],//失效码
      convertText:'',//输入的兑换码
      isCanUse:true,//是否在可用券页面
      isCoupon:true,//是否点击了优惠券tab
      tipMsg: '特权码不能为空',
      tipShow: false,
      icon: 'error',
      NcouponNum:'0',//不可用优惠券数量
      couponNum:'0',//可用优惠券数量
      NcodeNum:'0',//不可用码数量
      codeNum:'0',//可用码数量
      isLoading: true,
    }
  },
  activated () {
    this.tabIndex = 0;
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
    test(){
      console.log(8)
    },
    formatTime (time) {
      return moment(time).format('YYYY.MM.DD');
    },
    async convert (){
      if(this.convertText!==""){
        let param = {
          share_id: utils.getUrlKey('share_id'),
          uid: utils.getUrlKey('uid'),
          card_type:2,
          preference_code:this.convertText,
        }
        let res = (await convertCode(param)).data;
        if(res.code=='1'){
          console.log("code===1");
          this.tipShow = true;
          this.tipMsg = res.data.msg;
          this.icon='success';
          this.getCodeList();
        }else{
          this.tipShow = true;
          this.tipMsg = res.data.msg;
        }
      }else{
        this.tipShow = true;
        this.tipMsg = this.tipMsg;
      }
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
        this.couponList = res.data.no_used_list;
        this.QcouponList = res.data.no_used_list;
        this.noUsed = res.data.no_used_list;
        this.invalidList = res.data.invalid_list;
        this.couponNum = res.data.no_used_list.length;
        this.NcouponNum = res.data.invalid_list.length;
        this.tabs[0].num = this.couponNum;
      } else {
        this.couponList = [];
        this.QcouponList = [];
        this.noUsed = [];
        this.invalidList = [];
        this.couponNum ='0';
        this.NcouponNum = '0';
      }
      this.isLoading = false;
    },
    //获取特权码列表
    async getCodeList () {
      let res = (await getCode()).data;
      console.log(res);
      if (res.code === 1) {
        this.codeList = res.data.no_used_list;
        this.noUsedCode = res.data.no_used_list;
        this.invalidCodeList = res.data.invalid_list;
        this.codeNum = res.data.no_used_list.length;
        this.NcodeNum = res.data.invalid_list.length;
        this.tabs[1].num = this.codeNum;
      } else {
        this.codeList = [];
        this.noUsedCode = [];
        this.invalidCodeList = [];
        this.codeNum ='0';
        this.NcodeNum = '0';
      }
    },
    changeSelectTab (index) {
      this.tabIndex = index;
      this.detailIndexList = [];
      if (index === 0) {
        if(this.isCanUse==true){
          this.couponList = this.QcouponList;
        }else{
          this.couponList = this.invalidList;
        }
        this.isCoupon = true;
      } else if (index === 1) {
        if(this.isCanUse==true){
          this.couponList=this.codeList;
        }else{
          this.couponList = this.invalidCodeList;
        }
        this.isCoupon = false;
      }
    },
    //查看失效券码
    changeInvalid(){
      this.$router.push({path:'/InvalidCoupon'});
      if(this.tabIndex==0){
        this.couponList = this.invalidList;
      }else if(this.tabIndex==1){
        this.couponList = this.invalidCodeList;
      }
      this.isCanUse = false;
      this.tabs[0].num = this.NcouponNum;
      this.tabs[1].num = this.NcodeNum;
    },
    //查看可用的券
    changeUsed(){
      if(this.tabIndex==0){
        this.couponList = this.QcouponList;
      }else if(this.tabIndex==1){
        this.couponList = this.codeList;
      }
      this.isCanUse = true;
      this.tabs[0].num = this.couponNum;
      this.tabs[1].num = this.codeNum;
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
  padding:30px 0 180px 0;
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
  .exChange-box{
    padding:0 20px;
    box-sizing: border-box;
    .exChange{
      width:100%;
      border-radius:24px;
      display:flex;
      justify-content:space-between;
      .ex-input{
        font-size:14px;
        height:48px;
        width:255px;
        box-sizing: border-box;
        border:1px solid #231815;
        padding:0 20px;
        border-radius:24px;
        background:#f7f7f7;
       }
      .ex-btn{
        font-size:14px;
        height:49px;
        width:67px;
        box-sizing: border-box;
        border:none;
        border-radius:24px;
        color:#ffffff;
        background:#231815;
        position:relative;
        right:-3px;
        bottom:0;
      }
    }
    .copy-box{
      font-size:14px;
      padding:10px 0 30px;
      .copy-btn{
        width:18px;
        vertical-align: middle;
      }
    }
  }
  .tabUl{
    overflow: hidden;
    padding:30px 20px 0;
    .tabs{
      display:inline-block;
      width:33.3%;
      text-align:left;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color:rgba(27,30,33,0.4);
      p{
        /*margin-bottom:24px;*/
      }
      .line{
        /*width:20px;*/
        /*height:4px;*/
        /*background: #1B1E21;*/
        /*margin:0 auto;*/
        font-size:18px;
        display:inline-block;
        padding-bottom:5px;
        border-bottom:2px solid #231815;
        font-weight:bold;
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
    // padding:0 20px;
    background:#f7f7f7;
    .orange{
      .money{
        color:rgba(220,142,33,1) !important;
      }
    }
    .gray{
      //background:gray;
    }
    .list{
      margin-top:30px;
      position:relative;
      //height:138px;
      .list-top{
        overflow: hidden;
        background:url('../assets/images/coupon-bg.png') no-repeat;
        background-size: 100% 100%;
        /*padding:28px 10px 0 0;*/
        display: flex;
        align-items: center;
        width: 345px;
        /*border:1px dashed #cccccc;*/
        height: 100px;
        margin: auto;
        position:relative;
      }
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
            color:rgba(220,142,33,1);
          }
        }
        .title{
          margin-top: 16px;
          color:rgba(220,142,33,1);
        }
        .time{
          margin-bottom:6px;

        }
        .show-code-box{
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(220,142,33,1);
          font-size: 12px;
          padding: 8px 0 0;
          .code-img{
            width: 18px;
            vertical-align:middle;
          }
          p{
            display: inline-block;
            line-height: 18px;
            font-size:14px;
            border-bottom:1px solid rgba(27,30,33,0.12);
          }
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
          /*color:rgba(220,142,33,1);*/
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
          // width: 45%;
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
            top:0;
            right:0;
            .marker-icon{
              width:60px;
              /*height:53px;*/
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
}
.promocode-ul{
  .orange{
    .money{
      color:rgba(220,142,33,1) !important;
    }
  }
  .gray{
  //background:gray;
  }
  .list {
    margin-top: 30px;
    position: relative;
    /*height: 138 px;*/
    .list-top{
      overflow: hidden;
      background:url('../assets/images/code-bg.png') no-repeat;
      background-size: 100% 100%;
      /*padding:28px 10px 0 0;*/
      /*display: flex;*/
      /*align-items: center;*/
      width: 345px;
      /*border:1px dashed #cccccc;*/
      height: 100px;
      margin: auto;
      position:relative;
    }
    .list-top1{
      width: 345px;
      height: 100px;
      background:url('../assets/images/code-bg.png') no-repeat;
      background-size: 100% 100%;
      /*border:1px dashed #cccccc;*/
      margin: auto;
      .list-up{
        display:flex;
        padding:0 24px;
        height:66px;
        .list-up-left{
          color:red;
          box-sizing: border-box;
          width: 50%;
          /*padding-left:24px;*/
          .border-b{
            /*border-bottom:1px solid rgba(27,30,33,0.12);*/
            /*width:161px*/
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
          /*padding-right:24px;*/
          display:flex;
          justify-content:space-between;
          text-align:right;
          .money{
            font-family: Impact;
            font-size: 36px;
            line-height:50px;
            color:rgba(220,142,33,1);
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
            color:rgba(220,142,33,1);
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
            top:0;
            right:0;
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

    .list-up{
      display:flex;
      height:66px;
      padding:0 24px;
      .list-up-left{
        color:red;
        box-sizing: border-box;
        width: 50%;
        /*padding-left:24px;*/
        .border-b{
        /*border-bottom:1px solid rgba(27,30,33,0.12);*/
        /*width:161px*/
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
          color:rgba(153,153,153,1);
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
          color:rgba(153,153,153,1);
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
          color:rgba(35,24,21,0.8);
        }
        img{
          width:10px;
          margin-top:6px;
          line-height: 30px
        }
        .marker{
          position:absolute;
          top:0;
          right:0;
          .marker-icon{
            width:60px;
          }
        }
      }
      .list-down-right{
        /*font-size:12px;*/
        /*color:#1a1824;*/
        .time{
          color:rgba(26,24,36,1);
          font-size:10px;
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
  /*position:fixed;*/
  /*bottom:94px;*/
  /*left:0;*/
  /*right:0;*/
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
    // margin-top: 5px;
  }
}
</style>
