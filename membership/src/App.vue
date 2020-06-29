<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  html{
    height:100%;
  }
#app {
  font-family: PingFangSC-Regular;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  color: #182024;
  font-size:16px;
  height:100%;
  li{
    list-style-type:none;
  }
}
body{
  line-height:normal;
  height:100%;
}
</style>
