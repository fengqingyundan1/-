<template>
  <div class="CopyLink">
    <p>抱歉</p>
    <p>由于微信体系内不能直接打开天猫&淘宝链接，您需要复制链接，打开手机浏览器领取福利。</p>
    <p id="copy">{{link}}</p>
    <div class="copy_btn"  @click="copyLink" data-clipboard-target="#copy">复制链接</div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';

export default {
  name: 'CopyLink',
  data () {
    return {      
      link:'https://market.m.taobao.com/app/cem-fe/benefit-exchange/benefit-exchange/index.html'
    }
  },
  mounted () {
    var link = sessionStorage.getItem('copy_link')
    this.link = link
  },
  methods: {
    copyLink() {      
      let clipboard = new ClipboardJS(".copy_btn");
      clipboard.on('success', function () {
        console.log("复制成功")
      });
      clipboard.on('error', function () {
        console.log("复制失败")
      });
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/common";
.CopyLink{
  width: 100%;
  height: 100%;
  background: url('../assets/images/copy_back.png') no-repeat;
  background-size: 100% 100%;
  overflow: auto;
  p{
    width: 315px;
    margin: auto;
    text-align: center;
    font-size:16px;
    color: #ffffff;
    &:nth-child(1){
      font-size:30px;
      font-family:PingFangSC-Semibold,PingFang SC;
      margin-top: 40px;
    }
    &:nth-child(2){
      text-align: left;
      margin-top: 20px;
    }
     &:nth-child(3){
      text-align: left;
      margin-top: 40px;
      color: #4A90E2;
      margin-bottom: 30px;
    }
  }
  div{
    width:180px;
    height:50px;
    border-radius:25px;
    border:1px solid rgba(255,255,255,1);
    font-size:14px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height: 50px;
    text-align: center;
    margin: auto;
  }
}
</style>
