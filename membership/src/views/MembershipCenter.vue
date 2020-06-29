<template>
<div class="membership-center" @click="Refresh">
  <div class="transition-page animated fadeOutLeft delay-5s" v-if="isShowPage">
    <p class="title animated fadeIn">终于等到你</p>
    <div class="line animated fadeIn delay-1s"></div>
    <div class="text animated fadeIn">
      <p>在这里</p>
      <p>尽享户潮先知，首发活动，限定会员特权</p>
    </div>
    <div class="page-card animated fadeInUp delay-2s">
      <img src="../assets/images/card-bg.png" class="card-bg"/>
    </div>
    <div class="page-btn animated bounceIn delay-3s"><span>立即开启</span></div>
  </div>
  <div class="animated fadeIn" v-show="!isShowPage && !isLoading && !isFailure">
    <div class="membership-header">
      <div class="membership-con">
        <img :src="info.rankBg" class="img-bg"/>
        <div class="header-con">
          <div class="header-box">
            <img class="avatar " :src="info.img" @click="jumpInfo"/>
            <div class="box">
              <p class="name" @click="jumpInfo">{{info.name}}</p>
              <img class="marker" :src="info.rank"/>
              <div style="float:left" @click="jumpGrowthValue">
                <div class="line" ref="line">
                  <div class="line-color" ref="lineColor"></div>
                </div>
                <span class="rank">{{info.rankValue}} <i style="float:right;font-style:normal">升级</i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center-con">
      <div class="passport" @click="getPassport" style="padding:13px 0;width:182px;box-sizing: border-box;border-radius: 27px;">
        <div style="margin:0 auto;display:table">
          <img src="../assets/images/qr-code.png" style="width:30px;"/>
          <span style="font-size:14px;line-height:30px;margin-left:14px;">会员护照</span>
        </div>
      </div>
      <img class="curve" src="../assets/images/curve1.png"/>
      <div style="background: #FFFFFF;margin-top:-1px;padding-bottom:25px;">
        <ul class="list">
          <li @click="jumpInviteNewPeople"><img src="../assets/images/friend.png"/><p>邀请好友</p></li>
          <li @click="jumpIntegral"><img src="../assets/images/Member.png"/><p>会员积分</p></li>
          <li @click="jumpCoupon"><img src="../assets/images/coupon.png"/><p>优惠券</p></li>
          <li @click="jumpSmart"><img src="../assets/images/smart.png"/><p>SMART</p></li>
          <li @click="jumpHuWai"><img src="../assets/images/safe.png"/><p>户外宝</p></li>
        </ul>
      </div>
      <div class="partition-line"></div>
      <div class="membership-exclusive-activities">
        <div class="header">
          <h3>会员专享活动</h3>
          <p class="more" v-if="!noData" @click="moreActive">
            <span>更多活动</span>
            <img class="arrow-right" src="../assets/images/arrow-right.png"/>
          </p>
        </div>
        <ul class="activity-box" v-if="!noData">
          <li class="activity-item" v-for="(item, index) in list" :key="index" @click="goDetail(item.url)">
            <img class="activity-img"  :src="item.image_url"/>
            <div class="activity-title" :class="{'gray':item.status===1}">{{item.name}}</div>
            <div class="activity-date-box" :class="{'gray':item.status===1}">
              时间：{{formatTime(item.starttime)}} - {{formatTime(item.endtime)}}
            </div>
            <img class="used-img" v-if="item.status===1" src="../assets/images/active-end.png"/>
          </li>
        </ul>
        <p v-if="noData" style="text-align: center;color:rgba(27,30,33,0.6);font-size:14px;">暂无会员专享活动～～</p>
      </div>
    </div>
  </div>
  <div class="paydiv-wrapper">
    <div class="bg-dialog" v-if="passShow">
      <div class="pass-check">
        <div class="pass-box">
          <img src="../assets/images/equity-bg.png" class="img"/>
          <div class="title">
            <img src="../assets/images/toread@2x.png"/>
            <p>线上线下尊享会员权益</p>
          </div>
          <div class="pass-con">
            <img :src="code.qr_code" class="qr-img" v-if="code.qr_code"/>
            <img :src="code.bar_code" class="bar-img" v-if="code.bar_code"/>
          </div>
        </div>
        <div class="btn-close">
          <img src="../assets/images/close-white.png" @click="closePass"/>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-dialog" v-show="isShowCoupon && !isShowPage">
   <div class="bg-dialog" >
    <div class="new-people-coupon">
      <img src="../assets/images/new-people-coupon.png"/>
      <div style="padding: 0 30px">
       <div class="btn" @click="receiveNewCoupon">收下了</div>
      </div>
    </div>
  </div>
  </div>
  <div class="is-loading" v-if="isLoading">
    <img src="../assets/images/loading.png"/>
    <p>数据加载中，请稍后...</p>
  </div>
  <div class="is-loading" v-if="isFailure">
    <img src="../assets/images/failure.png"/>
    <p>加载失败，点击页面刷新</p>
  </div>

  <div style="display:none" @click="jumpNewPeople" ref="gopeople"></div>
</div>
</template>

<script>
import {getPassImg, getUserInfo, getActivityList, receiveCoupon, addNfcInfo} from '@/api/index'
import utils from '@/utils/util.js'
import $ from 'jquery'
export default {
  name: 'MembershipCenter',
  data () {
    return {
      isLoading: false,
      isFailure: false,
      isShowCoupon: false,
      passShow: false,
      value: 2100,
      code: {
        bar_code: '',
        qr_code: ''
      },
      isShowPage: false,
      isWelcome: false,
      list: [],
      noData: false,
      info: {
        id: '1234',
        img: '',
        name: '',
        rank: require('../assets/images/ordinary.png'),
        rankValue: 0,
        rankBg: require('../assets/images/rank1-bg.gif'),
        token:''
      },
      membershipRank: {
        '注册会员': require('../assets/images/ordinary.png'),
        '银卡会员': require('../assets/images/yinka.png'),
        '金卡会员': require('../assets/images/goldenCard.png'),
        '钻石会员': require('../assets/images/Diamonds-mark.png')
      },
      rankBg: {
        '注册会员': require('../assets/images/rank1-bg.gif'),
        '银卡会员': require('../assets/images/rank2-bg.gif'),
        '金卡会员': require('../assets/images/rank3-bg.gif'),
        '钻石会员': require('../assets/images/rank4-bg.gif')
      }
    }
  },
  methods: {
    jumpGrowthValue () {
      this.$router.push({path: 'GrowthValue', query: { id: this.info.id }});
    },
    jumpInviteNewPeople () {
      this.$router.push('InviteNewpeople');
    },
    jumpIntegral () {
      this.$router.push({path: 'Integral', query: { id: this.info.id }});
    },
    jumpCoupon () {
      this.$router.push('Coupon');
    },
    jumpSmart () {
      this.$router.push('SmartList')
    },
    jumpInfo () {
      this.$router.push('MemberInfo');
    },
    jumpNewPeople () {
      this.$router.push('NewPeople')
    },
    jumpHuWai(){
      window.location.href = 'https://toread.fantaiai.com/outdoor?token='+this.info.token
    },
    goDetail (url) {
      window.location.href = url;
    },
    async receiveNewCoupon () {
      this.isShowCoupon = false;
      let res = await receiveCoupon();
      if (res.data.code === 1) {
        console.log('领取成功')
      }
    },
    // 解决移动端滚屏问题
    // 在需要弹窗的代码里 调用stopBodyScroll ("true");
    // 在关闭弹窗代码里 调用stopBodyScroll ();
    stopBodyScroll (isFixed) {
      let bodyEl = document.body;
      let scrollTop = 0;
      bodyEl.style.left = '0';
      bodyEl.style.width = '100%';
      if (isFixed) {
        scrollTop = $(window).scrollTop();
        bodyEl.style.position = 'fixed';
        bodyEl.style.top = -scrollTop + 'px';
      } else {
        bodyEl.style.position = '';
        bodyEl.style.top = '';
        window.scrollTo(0, scrollTop) // 回到原先的top
      }
    },
    async getPassport () {
      this.passShow = true;
      this.stopBodyScroll('true');
      let img = await getPassImg();
      let res = img.data;
      if (res.code === 1) {
        this.code.bar_code = res.bar_code;
        this.code.qr_code = res.qr_code;
      }
    },
    closePass () {
      this.passShow = false;
      this.stopBodyScroll();
    },
    moreActive () {
      this.$router.push('ActivityList');
    },
    subString (val) {
      let str = '';
      if (val !== undefined) {
        if (val.length > 8) {
          str = val.substr(0, 8) + '...'
        } else {
          str = val
        }
      }
      return str;
    },
    async userInfo () {
      try {
        // this.isLoading = true;
        this.isFailure = false;
        let res = await getUserInfo();
        const info = res.data
        if (info.code === 1) {
          this.info.id = info.user_info.id;
          this.info.img = info.user_info.wechat_headimgurl;
          this.info.name = this.subString(info.user_info.username);
          this.info.rank = this.membershipRank[info.user_info.user_grade];
          this.info.rankBg = this.rankBg[info.user_info.user_grade];
          this.info.rankValue = info.user_info.text_point;
          this.info.token = info.user_info.token;
          // this.isShowCoupon = info.user_info.is_receive_coupon;
          this.isWelcome = info.user_info.is_welcome;
          if (this.isWelcome === '0') { // 老用户
            this.isShowPage = false;    
          } else if(this.isWelcome === '1') { // 新用户
            this.isShowPage = true;
            setTimeout(() => {              
              this.isShowPage = false;           
              this.$refs.gopeople.click()  
            }, 5500)
          }
          let width = this.$refs.line.clientWidth;
          $(this.$refs.lineColor).width(width * (info.user_info.actionpoint / info.user_info.next_actionpoint));
        } else {
          // 马庆测试 原始值true
          this.isFailure = true;
        }
      } catch (e) {
        // this.isFailure = true;
      }
      this.isLoading = false;
    },
    async activityList () {
      let params = {
        currentPage: 1,
        pagesize: 3,
      }
      const resp = await getActivityList(params);
      if (resp.data.code === 1) {
        if (resp.data.data.activityList.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
          this.list = resp.data.data.activityList;
        }
      } else {
        this.noData = true;
      }
    },
    async addNfcInfo () {
      const parms = {
        uid: sessionStorage.getItem('uid')
      }
      if (parms.uid !== '' && parms.uid !== null) {
        let res = await addNfcInfo(parms)
        console.log(res)
      }
    },
    formatTime (time) {
      const str = time.replace(/-/g, '/')
      const date = new Date(str);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return year + '.' + month + '.' + day
    },
    Refresh () {
      if (this.isFailure) {
        this.isLoading = true;
        this.userInfo();
        this.activityList();
      }
    }
  },
  mounted () {
    this.userInfo();
    this.activityList();
    this.addNfcInfo()
  },
  watch: {
  }
}
</script>

<style scoped lang="less">
@import "../assets/common";
.membership-center{
  height: -webkit-fill-available;
  .transition-page{
    padding-top:25px;
    .title{
      font-family: PingFangSC-Medium;
      font-size: 20px;
      color: #1B1E21;
      padding:0 50px;
    }
    .line{
      width:40px;
      height:1px;
      background: #D86F28;
      margin:16px 0 10px 50px;
    }
    .text{
      font-family: PingFangSC-Light;
      font-size: 15px;
      color: #1B1E21;
      letter-spacing: 0;
      line-height: 18px;
      padding:0 50px;
      animation-delay: 1.5s;
      -moz-animation-delay: 1.5s;
      -webkit-animation-delay: 1.5s;
    }
    .page-card{
      padding:0 20px;
      .card-bg{
        width:100%;
      }
    }
    .page-btn{
      padding:0 50px;
      position:absolute;
      width: 100%;
      box-sizing: border-box;
      bottom: 42px;
      span{
        display:block;
        border: 1px solid #1B1E21;
        border-radius: 27px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #1B1E21;
        height:44px;
        line-height:44px;
        text-align: center;
      }
    }
  }
}
.membership-header{
  .membership-con{
    position:relative;
    padding:0 10px;
    .img-bg{
      width:100%;
    }
    .header-con{
      position:absolute;
      top:60px;
      left:70px;
      .header-box{
        width:100%;
        height:54px;
      }
      .avatar{
        width:54px;
        height:54px;
        border-radius: 50%;
        display:block;
        float:left;
      }
      .box{
        float:left;
        margin-left:10px;
        .name{
          font-size:18px;
          color:#FFFFFF;
          margin-bottom:6px;
        }
        .marker{
          width:66px;
          float:left;
          margin-right:8px;
        }
        .line{
          display:inline-block;
          width:80px;
          height:4px;
          background: #2E2E2E;
          border-radius: 10px;
          position: relative;
          float:left;
          .line-color{
            position:absolute;
            top:0;
            left:0;
            height:4px;
            background: #CFB183;
            border-radius: 10px;
          }
        }
        .rank{
          font-family: PingFangSC-Light;
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          display:block;
          line-height:22px;
        }
      }
    }
  }
}
.center-con{
  position: relative;
  margin-top:-92px;
  .curve{width:100%;display:block;}
  .passport{
    position:absolute;
    background: #FFFFFF;
    box-shadow: 0 2px 28px 0 rgba(27,30,33,0.20);
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    -ms-transform:translateX(-50%);
    -moz-transform:translateX(-50%);
    img{
      float:left;
    }
    span{float:left;}
  }
  .list{
    display:flex;
    padding-top:40px;
    flex-wrap: wrap;
    li{
      width: 25%;
      text-align:center;
      font-size:12px;
      margin-top: 20px;
      img{
        width:26px;
        height:26px;
      }
    }
  }
  .partition-line{
    width:100%;
    height:8px;
    opacity: 0.04;
    background: #1B1E21;
  }
  .membership-exclusive-activities{
    padding:30px 20px;
    .header{
      margin-bottom:30px;
      overflow: hidden;
      h3{
        font-family: PingFangSC-Medium;
        color: #1B1E21;
        float:left;
      }
      .more{
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #1B1E21;
        float:right;
        img{
          opacity: 0.6;
          width:12px;
          height:12px;
        }
      }
    }
  }
}
.new-people-coupon{
  padding:0 30px;
  position: absolute;
  top: 70px;
  left: 0;
  .btn{
    height:54px;
    width:100%;
    line-height:54px;
    background: #FFFFFF;
    border-radius: 27px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #314885;
    text-align: center;
    margin-top:30px;
  }
  img{
    width:100%;
  }
}
.pass-check{
  padding:0 30px;
  position: absolute;
  top: 84px;
  left: 0;
  .pass-box{
    position:relative;
    .img{
      width:100%;
    }
    .title{
      font-size: 14px;
      color: #1B1E21;
      position:absolute;
      top:40px;
      left:30px;
      img{
        margin-bottom:10px;
        width:120px;
        display: block;
      }
    }
    .pass-con{
      position: absolute;
      top: 30%;
      padding: 0 50px;
      text-align: center;
      .qr-img{
        width:180px;
        height:180px;
        margin-bottom:10px;
      }
      .bar-img{
        width:160px;
      }
    }
  }
  .btn-close{
    text-align: center;
    margin-top:38px;
    img{
      width:40px;
      height:40px;
    }
  }
}
</style>
