import axios from 'axios'
import Router from '@/router/index.js'
const isPro = Object.is(process.env.NODE_ENV, 'production')
axios.defaults.retry = 0;
axios.defaults.timeout = 30000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
console.log("isPro==="+isPro)
let origin = window.location.origin;
//axios.defaults.baseURL = isPro ? 'https://wxatest.toread.com.cn' : '/api'
// axios.defaults.baseURL = isPro ? 'https://www.toread.com.cn' : '/api';
axios.defaults.baseURL = isPro ? origin : '/api';

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
let loadError = false;
axios.interceptors.response.use(
  response => {
    loadError = false;
    if (response.data.code !== undefined && response.data.code === 1000) {
      window.location.href = response.data.authorize_url;
    } else if ((response.data.code !== undefined && response.data.code === 2000)) {
      Router.push({path:'/Register'})
    }
    return response
  },
  err => {
    loadError = true;
    if (err && err.response && err.message) {
    } else {
      if (!window.navigator.onLine) {
        alert('网络已断开，请检查网络连接!')
      } else if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
        alert('网络状况不佳，请检查网络连接!')
      } else {
        alert('未知错误!')
      }
    }
    if (!err.message) {
      err.cancel = 'true'
    }
    const config = err.config
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err)

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(err)
    }

    // Increase the retry count
    config.__retryCount += 1

    // Create new promise to handle exponential backoff
    const backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, config.retryDelay || 1)
    })

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
      return axios(config)
    })
  }
)

export function getActivityList (opt) {
  return axios.get(`/index.php/Toread/activity/getlist?p=${opt.currentPage}&&pagesize=${opt.pagesize}`)
}
export function getPassImg () {
  return axios.get('/index.php/toread/user/passimg')
}
export function getSmsCode (opt) {
  return axios.post('/index.php/toread/tool/sendsms', opt)
}

export function register (opt) {
  return axios.post('/index.php/toread/user/register', opt)
}
export function getUser (opt) { // 授权
  return axios.post('/index.php/toread/user', opt)
}
export function updateInfo (opt) {
  return axios.post('/index.php/toread/user/update', opt)
}
export function getUserInfo (opt) {
  return axios.post('/index.php/toread/user/info', opt)
}
export function getDetail (opt) {
  return axios.get(`/index.php/toread/point/getDetail?memberId=${opt.memberId}&&type=${opt.type}`)
}
export function getInviteList (opt) {
  return axios.post('/index.php/toread/invite/getlist', opt)
}
export function getInviteLogin (opt) {
  return axios.get(`/index.php/toread/invite/login?share_id=${opt.share_id}&uid=${opt.uid}&source=${opt.source}`)
}
// export function getCoupon () {
//   return axios.get('/index.php/toread/coupon/getlist')
// }
export function getCoupon () {
  return axios.get('/index.php/toread/coupon/getcouponlist')
}
export function receiveCoupon (opt) {
  return axios.get(`/index.php/toread/coupon/getcoupon?sid=${opt.sid}`)
}
export function pickupCoupon (opt) {
  return axios.get(`/index.php/toread/coupon/pickup?sid=${opt.sid}`)
  // return axios.post('/index.php/toread/coupon/pickup', opt)
}
export function editMobile (opt) {
  return axios.post('/index.php/toread/user/editmobile', opt)
}
// 添加smart信息
export function addNfcInfo (opt) {
  return axios.post('/index.php/toread/smart/addsmart', opt)
}
// 获取smart列表
export function getNfcInfo (opt) {
  return axios.post('/index.php/toread/smart/getlist', opt)
}
//兑换特权码为优惠券
export function convertCode (opt){
  return axios.post('/index.php/sg/Usercard/get_coupon',opt)
}
//获取特权码列表
export function getCode (){
  return axios.post('/index.php/toread/coupon/getcodelist')
}
export { axios }
export { loadError };
