<template>
  <div class="Newpeople">
    <img src="../assets/images/new_banner.png" alt="" class="banner">
    <!-- <div class="ying">
      <div class="top">
        <div>
          <p class="price">20</p>
          <div class="right">
            <p class="title">输入特权码：<b>福利君送福利</b> <br>全场商品立减20元</p>            
          </div>        
        </div>  
        <div class="img_box">
          <img src="../assets/images/erweima.png" alt="">
          <p>长按识别二维码</p>
        </div>      
      </div>
      <a href="http://img.dzy.lvyelvxing.com/%E7%89%B9%E6%9D%83%E7%A0%81%E4%BD%BF%E7%94%A8%E8%A7%86%E9%A2%91.mp4">
        <div class="button">
          <p>特权码使用教程，点击播放</p>
          <img src="../assets/images/start.png" alt="">
        </div>
      </a>
    </div> -->
    <img src="../assets/images/new_title.png" alt="" class="new_title">
    <div class="list">
      <div
      :class="item.isclik ? 'box box6' :'box box'+(index+1)" 
      v-for="(item,index) in list"
      :key='index'
      @click="goHref(item)"
      >
        <div class="left">
          <p class="title">{{item.title}}</p>
          <p class="desc">{{item.desc}}</p>
        </div>
        <div class="right">
          <p class="con">{{item.con}}</p>
          <p :class="item.type===1 ? 'price price1' :'price price2'" >{{item.price}}</p>
        </div>
        <img src="../assets/images/isclick.png" alt="" class="isclick" v-if='item.isclik'>
      </div>
    </div>
  </div>
</template>

<script>
import {getInviteList} from '@/api/index'
export default {
  name: 'Newpeople',
  data () {
    return {
      list:[
        {id:0,title:'探路者硬货商城',desc:'限【探路者硬货商城】使用',con:'无门槛',price:20,type:1,href:'https://www.toread.com.cn/dist/index.html#/GetCoupon?sid=119',isclik:false},
        {id:1,title:'探路者会员专享店',desc:'限【探路者会员专享店】使用',con:'无门槛',price:50,type:1,href:'https://shop45602675.youzan.com/v2/ump/promocard/fetch?alias=8evb0xlh',isclik:false},
        {id:2,title:'粉丝奥莱店专享券',desc:'限【探路者粉丝奥莱店】使用',con:'满50元减',price:20,type:1,href:'https://www.toread.com.cn/dist/aolai.png',isclik:false},
        {id:3,title:'探路者线下直营专享券',desc:'限北京/天津/广州/成都直营门店',con:'新品折上',price:9,type:2,href:'https://www.toread.com.cn/dist/index.html#/GetCoupon?sid=115',isclik:false},
        // {id:4,title:'京东旗舰店专享券',desc:'限京东【探路者官方旗舰店】',con:'满199元减',price:20,type:1,href:'http://coupon.m.jd.com/coupons/show.action?key=c3802d4386124262b2c5121381810a2f&roleId=31888823&to=mall.jd.com/index-47340.html',isclik:false},
        // {id:5,title:'天猫旗舰店专享券',desc:'限天猫【探路者官方旗舰店】',con:'满300元减',price:40,type:1,href:'https://market.m.taobao.com/app/cem-fe/benefit-exchange/benefit-exchange/index.html?source=InterestsDetail&activityId=2382782',isclik:false},
        // {id:6,title:'户外装备旗舰店专享券',desc:'限天猫【探路者户外装备官方旗舰店】',con:'满200元减',price:30,type:1,href:'https://market.m.taobao.com/app/cem-fe/benefit-exchange/benefit-exchange/index.html?source=InterestsDetail&activityId=2348132',isclik:false}
      ],
      wxConfig:{}
    }
  },
  mounted () {
   let data = JSON.parse(sessionStorage.getItem('newppeople'))
   if(data) this.list = data
   this.inviteList()
  },
  methods: {
    goHref(val) {
      val.isclik = true     
      sessionStorage.setItem('newppeople',JSON.stringify(this.list))      
      if(val.id === 4 || val.id === 5){
        sessionStorage.setItem('copy_link',val.href)
        this.$router.push('CopyLink')
      }else{
         window.location.href = val.href
      }
    
    },
    async inviteList () {
      let res = await getInviteList({url: window.location.href});
      if (res.data.code === 1) {
        this.personList = res.data.user_list;
        this.wxConfig = res.data.wx_config;
        this.share_id = res.data.share_id;
        this.authentication()
      }
    },
    authentication () {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.wxConfig.appId, // 必填，公众号的唯一标识
        timestamp: this.wxConfig.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.wxConfig.nonceStr, // 必填，生成签名的随机串
        signature: this.wxConfig.signature, // 必填，签名
        jsApiList: ['hideAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
      });
      wx.ready(function () {
        wx.hideAllNonBaseMenuItem();
      });
      wx.error(function (res) {
        alert('啊哦，验证失败了')
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/common";
.Newpeople{
  .banner{
    width: 100%;
    display: block;
  }
  .ying{
    width: 349px;
    background:rgba(255,245,220,1);
    border-radius:0 0 10px 10px;
    margin: auto;
    padding-bottom: 18px;
    .button{
      width:309px;
      height:40px;
      background:rgba(224,167,86,1);
      border-radius:20px;
      font-size:14px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:14px;
      margin: 12px auto 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 16px;
        margin-left: 10px;
      }
    }
    .top{
      display: flex;    
      .price{
        font-size:70px;
        font-family:Impact;
        color:rgba(35,24,21,1);
        margin-top: 16px;
        &::before{
          content: '¥';
          font-size:18px;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          margin-left: 20px;
        }
      }
      .right{
        margin-left: 1.25rem;
        font-size: 12px;
        line-height:16px;
      }
      .img_box{
        margin-top: 1rem;
        margin-left: 60px;
        img{width: 100px};
        p{
          font-size:12px;
          font-family:PingFangSC-Light,PingFang SC;
          font-weight:300;
          color:rgba(35,24,21,1);
          text-align: center;
        }
      }
      .title{
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(35,24,21,1);
      }
      .desc{
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(35,24,21,1);
        line-height:14px;
        margin-top: 8px;
      }
    }
  }
  .new_title{
    width: 234px;
    margin: 40px auto 0 auto;
    display: block;
  }
  .list{
    padding-bottom: 20px;
    .box1{
      background:url(../assets/images/new_list-1.png);
    }
    .box2{
      background:url(../assets/images/new_list-2.png);
    }
    .box3{
      background:url(../assets/images/new_list-3.png);
    }
    .box4{
      background:url(../assets/images/new_list-4.png);
    }
    .box5{
      background:url(../assets/images/new_list-5.png);
    }
    .box6{
      background:url(../assets/images/new_list-6.png);
      opacity: 0.8;
    }
    .box7{
      background:url(../assets/images/new_list-1.png);
      opacity: 0.8;
    }
    .box{
      width:349px;
      height:110px;
      margin: 20px auto 0 auto;    
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      position: relative;
      .left{
        width: 212px;
        text-align: center;
        .title{
          font-size:17px;
          font-weight: 700;
          color:rgba(35,24,21,1);
        }
        .desc{
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(35,24,21,1);
          margin-top: 8px;
        }
      }
      .right{
        width: 135px;
        text-align: center;
        .con{
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(35,24,21,1);
          margin-top: 16px;
        }
        .price{
          font-size:70px;
          font-family:Impact;
          color:rgba(35,24,21,1);
          line-height:60px;        
          margin-top: 10px;  
        }
        .price1::after{
          content: '元';
          font-size:14px;
        }
        .price2::after{
          content: '折';
          font-size:14px;
        }
        .tag{
          font-size: 12px;
          line-height: 12px;
        }
      }
      .isclick{
        width: 57px;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
}
</style>
