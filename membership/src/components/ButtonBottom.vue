<template>
  <div class="btn-box">
    <div class="button-bottom" @click="goHref">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      required: true,
      type: String
    },
    href:{
        required: true,
        type: String
    }
  },
  data () {
    return {

    }
  },
  methods:{
      goHref:function(){
          this.$router.push(this.href)
      }
  }
}
</script>

<style scoped lang="less">
  .btn-box{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    padding:20px 0;
    background:#f7f7f7;
    .button-bottom{
      width:325px;
      height:54px;
      background:rgba(27,30,33,1);
      border-radius:27px;
      font-size:16px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:54px;
      text-align: center;
      margin:0 auto;
      /*position: fixed;*/
      /*bottom: 20px;*/
      /*left: 50%;*/
      /*transform: translateX(-50%)*/
    }
  }
</style>
