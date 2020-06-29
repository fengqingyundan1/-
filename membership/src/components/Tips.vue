<template>
    <div class="tips-dialog">
      <img :src="icon==='error'?error:success"/>
      <p>{{tipMsg}}</p>
    </div>
</template>

<script>
export default {
  name: 'Tips',
  props: {
    tipMsg: {
      required: false,
      type: String
    },
    icon: {
      required: false,
      default: 'error'
    }
  },
  data () {
    return {
      error: require('../assets/images/error-tip.png'),
      success: require('../assets/images/success.png')
    }
  }
}
</script>

<style scoped lang="less">
.tips-dialog{
  width:160px;
  height:160px;
  position:absolute;
  top:10px;
  left:50%;
  background:rgba(27,30,33,0.6);
  border-radius:8px;
  text-align: center;
  padding-top:44px;
  box-sizing: border-box;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
  -o-transform: translate(-50%, 0);
  -ms-transform:translate(-50%, 0);
  -moz-transform:translate(-50%, 0);
  img{
    width:40px;
    height:40px;
    display:block;
    margin:0 auto 12px;
  }
  p{
    font-size: 14px;
    color: #FFFFFF;
  }
}
</style>
