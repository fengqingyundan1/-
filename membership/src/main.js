// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'weui/src/style/weui.less'
import './utils/rem'
import 'animate.css/animate.css'
// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// new VConsole() // 初始化
Vue.config.productionTip = false

var _hmt = _hmt || [];
window._hmt = _hmt; // 必须把_hmt挂载到window下，否则找不到
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?3135668c18272140721ac41b4cc30a71";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
