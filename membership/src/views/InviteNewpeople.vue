<template>
  <div class="invite-new-people">
    <div class="info-bg">
      <div class="bg-color"></div>
      <div class="bg-img">
        <img src="../assets/images/vip-bg.png"/>
        <p class="text">邀请成功各得<span>500</span>积分</p>
      </div>
    </div>
    <div class="content-bg">
      <div class="content">
        <p class="title" @click="showRules=true"><span>规则说明</span><img class="arrow" src="../assets/images/arrow-right.png"/></p>
        <div class="rules-box">
          <div class="box-title">
            <img src="../assets/images/left.png"/>
            <p>已累计邀请{{personList.length}}人，赚取{{personList.length * 500}}积分</p>
            <img src="../assets/images/right.png"/>
          </div>
          <ul class="img-ul">
            <li v-for="(item, index) in personList" :key="index" v-if="personList.length>10?index<9:index<10">
              <img :src="item.wechat_headimgurl"/>
            </li>
            <li>
              <p class="kong" v-if="personList.length>10">
                <span>等{{personList.length-9}}位</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="invite-people" @click="isWxin">立即邀请好友</div>
      </div>
    </div>
    <div class="bg-dialog" v-if="shareStep">
      <div class="share">
        <div style="text-align: right">
          <img class="icon3" src="../assets/images/icon3.png"/>
        </div>
        <div style="float:right;margin-right:20px;">
          <p class="text1">1.点击右上角<span></span><span></span><span></span>按钮</p>
          <p>
            <span>2.点击</span>
            <img class="icon" src="../assets/images/icon2.png"/>
            <span>或</span>
            <img class="icon" src="../assets/images/icon1.png"/>
            <span>按钮</span>
          </p>
        </div>
        <div class="share-btn" @click="shareStep = false">知道了</div>
      </div>
    </div>
    <div class="bg-dialog" v-if="showRules">
      <div class="rules" >
        <div class="rules-content">
          <h2>奖励规则说明</h2>
          <p>1、被邀请人注册成为探路者会员，邀请人及被邀请均奖励500积分。</p>
          <p>2、您获得的积分可在【会员中心】-【会员积分】中查看详情。</p>
          <p>3、被邀请人仅限未注册过掌上【探路者公众号】的新用户。</p>
          <p>4、相同设备编号、手机号、微信号视为同一用户。</p>
          <p>5、针对违规骗取推荐奖励的行为，将不予发放推荐奖励、追回相关奖励或封停账号，并依法追究其法律责任</p>
        </div>
        <div style="text-align:center">
          <img class="close-btn" src="../assets/images/close.png" @click="showRules=false"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getInviteList} from '@/api/index'
export default {
  name: 'InviteNewpeople',
  data () {
    return {
      showRules: false,
      personList: [],
      wxConfig: {},
      shareStep: false,
      share_id: '',
      number: 0,
      integral: 0
    }
  },
  activated () {
    this.inviteList()
  },
  methods: {
    async inviteList () {
      let res = await getInviteList({url: window.location.href});
      if (res.data.code === 1) {
        this.personList = res.data.user_list;
        this.wxConfig = res.data.wx_config;
        this.share_id = res.data.share_id;
        this.authentication()
      }
    },
    isWxin(){
        const ua = navigator.userAgent.toLowerCase();
    　  const isWeixin = ua.indexOf('micromessenger') != -1;
    　　  if (isWeixin) {
      　　 this.shareStep = true
    　　  }else{
          alert('请在微信中打开分享')   
    　　}
    },
    authentication () {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.wxConfig.appId, // 必填，公众号的唯一标识
        timestamp: this.wxConfig.timestamp, // 必填，生成签名的时间戳
        nonceStr: this.wxConfig.nonceStr, // 必填，生成签名的随机串
        signature: this.wxConfig.signature, // 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
                      
      });
      let self = this;
      console.log(window.location.origin + window.location.pathname + '#/Register?share_id=' + self.share_id)
      wx.ready(function () {
        let con = ({
          title: '刚刚我获得探路者会员限定特权，现邀你一起参与来领取福利', // 分享标题
          desc: '在这里尽享户潮先知，首发活动，户外装备等十几种权益噢！', // 分享描述
          link: window.location.origin + window.location.pathname + '?share_id=' + self.share_id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: window.location.origin + '/dist/static/share.png', // 分享图标
          success: function () {
            // alert('分享成功了')
            //
          }
        })
        wx.updateTimelineShareData(con);
        wx.updateAppMessageShareData(con);
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
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
.invite-new-people{
  .content{
    .title{
      color:rgba(27,30,33,0.6);
      font-size:14px;
      width: fit-content;
      margin:0 auto;
      padding-top:10px;
      span{
        line-height:14px;
        display:inline-block;
      }
      .arrow{
        width:13px;
        height:13px;
        opacity: 0.6;
        display:inline-block;
      }
    }
    .rules-box{
      background: #FFFEFA;
      box-shadow: 0 0 30px 0 rgba(27,30,33,0.10);
      border-radius: 6px;
      padding:30px 10px;
      margin-top:26px;
      .box-title{
        overflow: hidden;
        margin-bottom:12px;
        text-align: center;
        img{
          display: inline-block;
          vertical-align: middle;
          width:47px;
          height:5px;
        }
        p{
          display: inline-block;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #7A4437;
        }
      }
      .img-ul{
        overflow: hidden;
        li{
          width:20%;
          float:left;
          text-align: center;
          margin-top:18px;
          img{
            width:46px;
            height:46px;
            border-radius: 50%;
          }
        }
        .kong{
          width: 46px;
          height: 46px;
          border: 1px solid rgba(72, 46, 23, 0.6);
          border-radius: 50%;
          line-height: 46px;
          font-size: 10px;
          color: #482E17;
          display: inline-block;
          box-sizing: border-box;
        }
      }
    }
    .invite-people{
      background: #1B1E21;
      border-radius: 27px;
      height:54px;
      font-family: PingFangSC-Medium;
      color: #FFFFFF;
      text-align: center;
      line-height:54px;
      margin-top:96px;
    }
  }

  .rules{
    width:100%;
    padding:0 20px;
    box-sizing: border-box;
    position:absolute;
    top:50px;
    .rules-content{
      background-image: linear-gradient(-156deg, #F5E8CE 4%, #F0D7B4 100%);
      border-radius: 6px;
      padding:24px 30px 20px;
      h2{
        font-size: 18px;
        color: #7A4437;
        text-align:center;
        margin-bottom:12px;
      }
      p{
        font-size: 14px;
        color: #1E000B;
        line-height:20px;
        margin-bottom:10px;
      }
    }
    .close-btn{
      width:40px;
      height:40px;
      margin-top:20px;
    }
  }
  .share{
    font-size:16px;
    color:rgba(255,255,255,1);
    .icon3{
      width:80px;
      margin-bottom:8px;
      padding-right:20px;
    }
    .text1{
      margin-bottom:20px;
      span{
        width:12px;
        height:12px;
        background:rgba(255,255,255,1);
        display:inline-block;
        border-radius: 50%;
        margin-left:8px;
      }
      span:last-child{
        margin-right:8px;
      }
    }
    .share-btn{
      margin-top:32px;
      width:120px;
      height:40px;
      border-radius:7px;
      border:1px solid rgba(255,255,255,1);
      text-align: center;
      line-height:40px;
      float:right;
      margin-right:80px;
    }
    .icon{width:36px;height:36px;margin:0 12px;vertical-align: middle}
  }
}
</style>
