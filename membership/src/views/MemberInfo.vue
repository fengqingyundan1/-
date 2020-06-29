<template>
<div class="member-info">
  <div class="head">
    <img :src="info.wechat_headimgurl"/>
    <div class="tip">微信头像</div>
  </div>
  <div class="info-con">
    <label>姓名</label>
    <input class="content" v-model="info.username"/>
  </div>
  <div class="info-con">
    <label>出生日期</label>
    <div class="content" id="dateShowBtn" :data-default="defaultDate">{{info.birth}}</div>
    <img class="arrow-right" src="../assets/images/arrow-right.png" v-if="info.can_alter===0"/>
  </div>
  <div class="info-con">
    <label>性别</label>
    <!--<div class="content" @click="handelSex">{{info.sex}}</div>-->
    <div class="content" id="sexShowBtn" :data-default="defaultSex">{{info.sex}}</div>
    <img class="arrow-right" src="../assets/images/arrow-right.png"/>
  </div>
  <div class="info-con">
    <label>手机号</label>
    <input class="content" v-model="info.mobile" readonly/>
    <!--<input class="content" v-model="info.mobile" readonly @click="changeMobile"/>-->
    <!--<img class="arrow-right" src="../assets/images/arrow-right.png" @click="changeMobile"/>-->
  </div>
  <div class="info-con">
    <label>微信</label>
    <div class="content">{{info.nickname}}</div>
  </div>
  <p class="message" :class = "{'color':info.can_alter}">{{info.can_alter===0?'注：会员权益，出生日期仅修改1次。':'注：已用完，不可再修改出生日期。'}}</p>
  <div class="confirm" @click="submit">
    <span v-if="!isLoading">保存</span>
    <img src="../assets/images/loading1.png" class="loading-img" v-if="isLoading"/>
  </div>
  <transition name="fade">
    <tips :tipMsg="tipMsg" v-show="tipShow" transiton="fade" :icon="icon"></tips>
  </transition>
</div>
</template>

<script>
import {getUserInfo, updateInfo, loadError} from '@/api/index'
import tips from '../components/Tips'
import $ from 'jquery'
export default {
  name: 'MemberInfo',
  components: {
    tips
  },
  data () {
    return {
      defaultDate: '2019-01-01',
      defaultSex: '男',
      info: {
        wechat_headimgurl: '',
        username: '',
        birth: '',
        sex: '',
        mobile: '',
        nickname: ''
      },
      messgae: '注：已用完，不可再修改出生日期',
      isShow: false,
      sexMap: {
        '0': '未知',
        '1': '男',
        '2': '女'
      },
      icon: 'error',
      disbaled: false,
      time: 60,
      tipMsg: '保存成功',
      tipShow: false,
      sexToNum: {
        '未知': '0',
        '男': '1',
        '女': '2',
      },
      loadError: false,
      isLoading:false
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
  async mounted () {
    $('input').blur(function () {
      setTimeout(function () {
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 300);
    });
    let res = await getUserInfo();
    if (res.data.code === 1) {
      this.info = Object.assign(this.info, res.data.user_info);
      this.info.sex = this.sexMap[res.data.user_info.sex];
      this.defaultSex = this.sexMap[res.data.user_info.sex];
      this.defaultDate = this.info.birth
      let self = this;
      new Msex('sexShowBtn', {
        acceptId: 'sexShowBtn',
        onSexSure: function (res) {
          self.info.sex = res;
          self.defaultSex = res;
        }
      })
      if (this.info.can_alter === 0) {
        new Mdate('dateShowBtn', {
          acceptId: 'dateShowBtn',
          beginYear: '1970',
          beginMonth: '1',
          beginDay: '',
          endYear: '',
          endMonth: '',
          endDay: '',
          format: '-',
          onDateSure: function (res) {
            self.info.birth = res;
            self.defaultDate = res;
          }
        })
      }
    }
  },
  methods: {
    async submit () {
      this.isShow = true;
      if (this.info.username !== '' && this.info.birth !== '' && !this.isLoading) {
        this.isLoading = true;
        let par = {
          action: 'update',
          name: this.info.username,
          birthday: this.info.birth,
          sex: this.sexToNum[this.info.sex]
        }
        const res = await updateInfo(par);
        this.loadError = loadError;
        if (this.loadError) {
          this.tipShow = true;
          this.tipMsg = '保存失败'
        }
        if (res.data.code === 1) {
          this.icon = 'success'
          this.tipShow = true;
          this.tipMsg = '保存成功'
          let self = this;
          setTimeout(() => {
            self.$router.push('MembershipCenter');
          }, 1500)
        } else {
          this.tipShow = true;
          this.tipMsg = res.data.msg;
        }
        this.isLoading = false;
      }
    },
    handelClick () {
      console.log(this.info)
      if (this.info.can_alter === 0) {
        const str = this.info.birth.replace(/-/g, '/')
        const time = new Date(str);
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        let self = this
        weui.datePicker({
          start: 1900,
          end: 2019,
          defaultValue: [year, month, day],
          onChange: function (result) {
            console.log(result)
          },
          onConfirm: function (result) {
            console.log(result)
            let y = result[0].value
            let m = result[1].value
            let d = result[2].value
            let time = y + '-' + m + '-' + d
            console.log(time)
            self.info.birth = time
          },
          id: 'datePicker'
        })
      }
    },
    handelSex () {
      let val = this.info.sex === '男' ? 0 : 1
      let self = this
      weui.picker([
        {
          label: '男',
          value: 0
          // disabled: true // 不可用
        },
        {
          label: '女',
          value: 1
        }
      ], {
        className: 'custom-classname',
        container: 'body',
        defaultValue: [val],
        onChange: function (result) {
          console.log(result)
        },
        onConfirm: function (result) {
          console.log(result)
          self.info.sex = result[0].label
        },
        id: 'singleLinePicker'
      })
    },
    changeMobile () {
      this.$router.push('ModifyMobile');
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/common";
.member-info{
  padding:30px 20px;
  input{
     outline:none;
     border:none;
   }
  .head{
    margin-bottom:10px;
    display:flex;
    img{
      width:50px;
      height:50px;
      border-radius: 50%;
    }
    .tip{
      flex:1;
      font-size: 16px;
      color: #1B1E21;
      line-height:50px;
      text-align:right;
    }
  }

  .confirm{
    width:100%;
    height:54px;
    line-height:54px;
    text-align:center;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #FFFFFF;
    background: #1B1E21;
    border-radius: 27px;
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
  }
  .info-con{
    height:56px;
    line-height:56px;
    display:flex;
    border-bottom:0.5px solid rgba(27,30,33,0.12);
    .content{
      font-family: PingFangSC-Light;
      flex:1;
      text-align:right;
      height:55px;
      font-size: 14px;
      color: #1B1E21;
    }
    .arrow-right{
      width:12px;
      height:12px;
      margin-top:22px;
      opacity: 0.6;
      margin-left:8px;
    }
  }
  .message{
    margin-top:10px;
    font-size: 12px;
    color: rgba(238,105,21,0.8);
    margin-bottom:100px;
  }
  .color{
    color:rgba(27,30,33,0.4)
  }
}
</style>
