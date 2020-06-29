import Vue from 'vue'
import Router from 'vue-router'
// import { getUser } from '@/api/index'
import Login from '@/views/Login'
import Integral from '@/views/Integral'
import IntegralRule from '@/views/IntegralRule'
import GrowthValueRule from '@/views/GrowthValueRule'
import GrowthValue from '@/views/GrowthValue'
import Coupon from '@/views/Coupon'
import InvalidCoupon from '@/views/InvalidCoupon'
import GetCoupon from '@/views/GetCoupon'
import MemberInfo from '@/views/MemberInfo'
import ActivityList from '@/views/ActivityList'
import InviteNewpeople from '@/views/InviteNewpeople'
import MembershipCenter from '@/views/MembershipCenter'
import Register from '@/views/Register'
import BasicInfo from '@/views/BasicInfo'
import ModifyMobile from '@/views/ModifyMobile'
import rightsExplain from '@/views/rightsExplain'
import defaultPage from '@/views/defaultPage'
import SmartList from '@/views/SmartList'
import newPeople from '@/views/newPeopleCoupon'
import CopyLink from '@/views/CopyLink'
import End from '@/views/End'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',
        keepAlive: false
      }
    },
    {
      path: '/',
      name: 'defaultPage',
      component: defaultPage,
      meta: {
        title: '',
        keepAlive: false
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        title: '登录注册',
        keepAlive: false
      }
    },
    {
      path: '/integral',
      name: 'Integral',
      component: Integral,
      meta: {
        title: '积分',
        keepAlive: true
      }
    },
    {
      path: '/integralRule',
      name: 'IntegralRule',
      component: IntegralRule,
      meta: {
        title: '积分规则',
        keepAlive: true
      }
    },
    {
      path: '/growthValue',
      name: 'GrowthValue',
      component: GrowthValue,
      meta: {
        title: '成长值',
        keepAlive: true
      }
    },
    {
      path: '/growthValueRule',
      name: 'GrowthValueRule',
      component: GrowthValueRule,
      meta: {
        title: '成长值规则',
        keepAlive: true
      }
    },
    {
      path: '/Coupon',
      name: 'Coupon',
      component: Coupon,
      meta: {
        title: '优惠券',
        keepAlive: true
      }
    },
    {
      path: '/InvalidCoupon',
      name: 'InvalidCoupon',
      component: InvalidCoupon,
      meta: {
        title: '我的券码',
        keepAlive: true
      }
    },
    {
      path: '/GetCoupon',
      name: 'GetCoupon',
      component: GetCoupon,
      meta: {
        title: '领取优惠券',
        keepAlive: false
      }
    },
    {
      path: '/MemberInfo',
      name: 'MemberInfo',
      component: MemberInfo,
      meta: {
        title: '会员资料',
        keepAlive: false
      }
    },
    {
      path: '/ActivityList',
      name: 'ActivityList',
      component: ActivityList,
      meta: {
        title: '活动列表',
        keepAlive: false
      }
    },
    {
      path: '/InviteNewpeople',
      name: 'InviteNewpeople',
      component: InviteNewpeople,
      meta: {
        title: '邀请新人',
        keepAlive: true
      }
    },
    {
      path: '/MembershipCenter',
      name: 'MembershipCenter',
      component: MembershipCenter,
      meta: {
        title: '会员中心',
        keepAlive: false
      }
    },
    {
      path: '/BasicInfo',
      name: 'BasicInfo',
      component: BasicInfo,
      meta: {
        title: '会员基本信息',
        keepAlive: true
      }
    },
    {
      path: '/ModifyMobile',
      name: 'ModifyMobile',
      component: ModifyMobile,
      meta: {
        title: '手机号修改',
        keepAlive: false
      }
    },
    {
      path: '/rightsExplain',
      name: 'rightsExplain',
      component: rightsExplain,
      meta: {
        title: '会员权益',
        keepAlive: true
      }
    },
    {
      path: '/SmartList',
      name: 'SmartList',
      component: SmartList,
      meta: {
        title: 'TOREAD SMART',
        keepAlive: true
      }
    },
    {
      path: '/NewPeople',
      name: 'NewPeople',
      component: newPeople,
      meta: {
        title: '新用户专享',
        keepAlive: true
      }
    },
    {
      path: '/CopyLink',
      name: 'CopyLink',
      component: CopyLink,
      meta: {
        title: '复制链接',
      }
    },
    {
      path: '/End',
      name: 'End',
      component: End,
      meta: {
        title: '活动结束',
      }
    },
  ]
})
router.beforeEach(async (to, from, next) => {
  // let codeInfo = await getUser();
  // console.log(codeInfo)
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (_hmt) {
    if (to.path) {
        console.log('/#' + to.fullPath)
        _hmt.push(['_trackPageview', '/#' + to.fullPath]);
    }
}
  next()
})
export default router
