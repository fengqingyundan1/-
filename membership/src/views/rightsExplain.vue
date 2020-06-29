<template>
<div class="rightsExplain">
  <ul class="tabUl">
    <li class="tabs" v-for="(tab,i) in tabs" :key="i"
         :class="[tabIndex === tab.index ? 'tabsActive' : '']"
         @click="changeSelectTab(tab.index)">
      <p>{{tab.name}}</p>
      <div class="line" v-if="tabIndex === tab.index"></div>
    </li>
  </ul>
  <div class="division-line"></div>
  <ul v-for="(detail,index) in rightsList" :key="index" class="rights-ul">
    <li class="list-title-box">
      <div class="list-title">
        <img class="activity-img"  src="../assets/images/member-icon.jpg"/>
        <div class="activity-title">{{detail.title}}</div>
      </div>
      <div class="list-text">
        {{detail.text}}
      </div>
    </li>
    <li v-for="(child,index) in detail.childList" :key="index" class="list">
      <div class="list-title">
        {{child.childTitle}}
      </div>
      <div v-for="(chText,index) in child.childText" :key="index" class="list-text">
        {{chText}}
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'rightsExplain',
  data () {
    return {
      tabs: [
        {
          name: '普通会员',
          index: 0
        },
        {
          name: '银卡会员',
          index: 1
        },
        {
          name: '金卡会员',
          index: 2
        },
        {
          name: '钻石会员',
          index: 3
        }
      ],
      common: [
        {
          title: '普通会员积分说明',
          text: '积分获取：积分仅可通过在【探路者直营店】、【会员商城】、【硬货小程序】进行消费获取',
          childList: [
            {
              childTitle: '·日常消费积分',
              childText: ['注册成为探路者会员后，购买5折以上商品时可获得积分，具体获取积分比例根据会员等级而定，积分将于交易完成后的15日录入会员账号内。']
            },
            {
              childTitle: '·会员生日月及入会周年纪念月消费积分',
              childText: ['会员生日当月，购买5折以上商品时可获得2倍积分（每自然年仅可生效一次）。会员入会周年纪念月，购买5折以上商品时可获得2倍积分。']
            },
            {
              childTitle: '·会员权益日消费积分',
              childText: ['会员在每次【会员权益日】当天，购买5折以上商品时可获得3倍积分。']
            }
          ]
        },
        {
          title: '会员优惠说明',
          text: '优惠分为线上优惠、线下店铺优惠，以优惠券说明为准',
          childList: [
            {
              childTitle: '·特权码',
              childText: ['会员等级到达【勃朗峰会员】或【珠峰会员】可获得会员特权码，凭此特权码可以在指定内购商城享受会员专属折扣购买商品。']
            },
            {
              childTitle: '·生日券',
              childText: ['会员生日当月将获得一张【满减优惠券】，具体满减内容根据会员等级而定，此优惠券每自然年仅可获得一次，使用期限为3个月，过期未使用将自动作废。']
            },
            {
              childTitle: '·激活券',
              childText: ['加入探路者会员后，将获得一张无门槛10元优惠券，此优惠券使用期限为1个月，过期未使用将自动作废。']
            },
            {
              childTitle: '·会员优惠券',
              childText: ['会员等级每提升一级后，将获得一张【攀登优惠券】，具体优惠券内容根据提升后所处会员等级而定，此优惠券使用期限为6个月，过期未使用将自动作废;', '【勃朗峰会员】和【珠峰会员】每季度将获得一定数量的【满减优惠券】，具体优惠券内容根据会员等级而定，此优惠券使用期限为1个月，过期未使用将自动作废。']
            }
          ]
        },
        {
          title: '会员活动说明',
          text: '会员专享活动，具体可到会员中心底部查看',
          childList: [
            {
              childTitle: '·会员专属活动',
              childText: ['注册成为【探路者会员】后，可获得参加各类会员专属活动资格，具体活动内容信息将定期在“会员活动中心”更新。']
            }
          ]
        }
      ],
      silver: [
        {
          title: '银卡会员积分说明',
          text: '积分获取：积分仅可通过在【探路者直营店】、【会员商城】、【硬货小程序】进行消费获取',
          childList: [
            {
              childTitle: '·日常消费积分',
              childText: ['注册成为探路者会员后，购买5折以上商品时可获得积分，具体获取积分比例根据会员等级而定，积分将于交易完成后的15日录入会员账号内。']
            },
            {
              childTitle: '·会员生日月及入会周年纪念月消费积分',
              childText: ['会员生日当月，购买5折以上商品时可获得2倍积分（每自然年仅可生效一次）。会员入会周年纪念月，购买5折以上商品时可获得2倍积分。']
            },
            {
              childTitle: '·会员权益日消费积分',
              childText: ['会员在每次【会员权益日】当天，购买5折以上商品时可获得3倍积分。']
            }
          ]
        },
        {
          title: '会员优惠说明',
          text: '优惠分为线上优惠、线下店铺优惠，以优惠券说明为准',
          childList: [
            {
              childTitle: '·特权码',
              childText: ['会员等级到达【勃朗峰会员】或【珠峰会员】可获得会员特权码，凭此特权码可以在指定内购商城享受会员专属折扣购买商品。']
            },
            {
              childTitle: '·生日券',
              childText: ['会员生日当月将获得一张【满减优惠券】，具体满减内容根据会员等级而定，此优惠券每自然年仅可获得一次，使用期限为3个月，过期未使用将自动作废。']
            },
            {
              childTitle: '·激活券',
              childText: ['加入探路者会员后，将获得一张无门槛10元优惠券，此优惠券使用期限为1个月，过期未使用将自动作废。']
            },
            {
              childTitle: '·会员优惠券',
              childText: ['会员等级每提升一级后，将获得一张【攀登优惠券】，具体优惠券内容根据提升后所处会员等级而定，此优惠券使用期限为6个月，过期未使用将自动作废;', '【勃朗峰会员】和【珠峰会员】每季度将获得一定数量的【满减优惠券】，具体优惠券内容根据会员等级而定，此优惠券使用期限为1个月，过期未使用将自动作废。']
            }
          ]
        },
        {
          title: '会员活动说明',
          text: '会员专享活动，具体可到会员中心底部查看',
          childList: [
            {
              childTitle: '·会员专属活动',
              childText: ['注册成为【探路者会员】后，可获得参加各类会员专属活动资格，具体活动内容信息将定期在“会员活动中心”更新。']
            }
          ]
        }
      ],
      gold: [
        {
          title: '黄金会员积分说明',
          text: '积分获取：积分仅可通过在【探路者直营店】、【会员商城】、【硬货小程序】进行消费获取',
          childList: [
            {
              childTitle: '·日常消费积分',
              childText: ['注册成为探路者会员后，购买5折以上商品时可获得积分，具体获取积分比例根据会员等级而定，积分将于交易完成后的15日录入会员账号内。']
            },
            {
              childTitle: '·会员生日月及入会周年纪念月消费积分',
              childText: ['会员生日当月，购买5折以上商品时可获得2倍积分（每自然年仅可生效一次）。会员入会周年纪念月，购买5折以上商品时可获得2倍积分。']
            },
            {
              childTitle: '·会员权益日消费积分',
              childText: ['会员在每次【会员权益日】当天，购买5折以上商品时可获得3倍积分。']
            }
          ]
        },
        {
          title: '会员优惠说明',
          text: '优惠分为线上优惠、线下店铺优惠，以优惠券说明为准',
          childList: [
            {
              childTitle: '·特权码',
              childText: ['会员等级到达【勃朗峰会员】或【珠峰会员】可获得会员特权码，凭此特权码可以在指定内购商城享受会员专属折扣购买商品。']
            },
            {
              childTitle: '·生日券',
              childText: ['会员生日当月将获得一张【满减优惠券】，具体满减内容根据会员等级而定，此优惠券每自然年仅可获得一次，使用期限为3个月，过期未使用将自动作废。']
            },
            {
              childTitle: '·激活券',
              childText: ['加入探路者会员后，将获得一张无门槛10元优惠券，此优惠券使用期限为1个月，过期未使用将自动作废。']
            },
            {
              childTitle: '·会员优惠券',
              childText: ['会员等级每提升一级后，将获得一张【攀登优惠券】，具体优惠券内容根据提升后所处会员等级而定，此优惠券使用期限为6个月，过期未使用将自动作废;', '【勃朗峰会员】和【珠峰会员】每季度将获得一定数量的【满减优惠券】，具体优惠券内容根据会员等级而定，此优惠券使用期限为1个月，过期未使用将自动作废。']
            }
          ]
        },
        {
          title: '会员活动说明',
          text: '会员专享活动，具体可到会员中心底部查看',
          childList: [
            {
              childTitle: '·会员专属活动',
              childText: ['注册成为【探路者会员】后，可获得参加各类会员专属活动资格，具体活动内容信息将定期在“会员活动中心”更新。']
            }
          ]
        }
      ],
      diamond: [
        {
          title: '钻石会员积分说明',
          text: '积分获取：积分仅可通过在【探路者直营店】、【会员商城】、【硬货小程序】进行消费获取',
          childList: [
            {
              childTitle: '·日常消费积分',
              childText: ['注册成为探路者会员后，购买5折以上商品时可获得积分，具体获取积分比例根据会员等级而定，积分将于交易完成后的15日录入会员账号内。']
            },
            {
              childTitle: '·会员生日月及入会周年纪念月消费积分',
              childText: ['会员生日当月，购买5折以上商品时可获得2倍积分（每自然年仅可生效一次）。会员入会周年纪念月，购买5折以上商品时可获得2倍积分。']
            },
            {
              childTitle: '·会员权益日消费积分',
              childText: ['会员在每次【会员权益日】当天，购买5折以上商品时可获得3倍积分。']
            }
          ]
        },
        {
          title: '会员优惠说明',
          text: '优惠分为线上优惠、线下店铺优惠，以优惠券说明为准',
          childList: [
            {
              childTitle: '·特权码',
              childText: ['会员等级到达【勃朗峰会员】或【珠峰会员】可获得会员特权码，凭此特权码可以在指定内购商城享受会员专属折扣购买商品。']
            },
            {
              childTitle: '·生日券',
              childText: ['会员生日当月将获得一张【满减优惠券】，具体满减内容根据会员等级而定，此优惠券每自然年仅可获得一次，使用期限为3个月，过期未使用将自动作废。']
            },
            {
              childTitle: '·激活券',
              childText: ['加入探路者会员后，将获得一张无门槛10元优惠券，此优惠券使用期限为1个月，过期未使用将自动作废。']
            },
            {
              childTitle: '·会员优惠券',
              childText: ['会员等级每提升一级后，将获得一张【攀登优惠券】，具体优惠券内容根据提升后所处会员等级而定，此优惠券使用期限为6个月，过期未使用将自动作废;', '【勃朗峰会员】和【珠峰会员】每季度将获得一定数量的【满减优惠券】，具体优惠券内容根据会员等级而定，此优惠券使用期限为1个月，过期未使用将自动作废。']
            }
          ]
        },
        {
          title: '会员活动说明',
          text: '会员专享活动，具体可到会员中心底部查看',
          childList: [
            {
              childTitle: '·会员专属活动',
              childText: ['注册成为【探路者会员】后，可获得参加各类会员专属活动资格，具体活动内容信息将定期在“会员活动中心”更新。']
            }
          ]
        }
      ],
      tabIndex: 0,
      rightsList: []
    }
  },
  mounted () {
    this.changeSelectTab(0)
  },
  methods: {
    changeSelectTab (index) {
      this.tabIndex = index
      if (index === 0) {
        this.rightsList = this.common
      } else if (index === 1) {
        this.rightsList = this.silver
      } else if (index === 2) {
        this.rightsList = this.gold
      } else if (index === 3) {
        this.rightsList = this.diamond
      }
    }
  }
}
</script>

<style scoped lang="less">
.rightsExplain{
  padding:30px 0;
  .tabUl{
    overflow: hidden;
    padding:0 20px;
    .tabs{
      display:inline-block;
      width:25%;
      text-align:center;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color:rgba(27,30,33,0.4);
      p{
        margin-bottom:24px;
      }
      .line{
        width:20px;
        height:4px;
        background: #1B1E21;
        margin:0 auto;
      }
    }
    .tabsActive{
      color:rgba(27,30,33,1);
      font-family: PingFangSC-Medium;
      font-size: 20px;
    }
  }
  .division-line{
    width:100%;
    height:8px;
    background: rgba(27,30,33,0.04);
  }
  .rights-ul{
    padding:0 20px;
    .list-title-box{
      .list-title{
        .activity-title{
          display:inline-block;
          font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #1B1E21;
          letter-spacing: 0;
          line-height: 18px;
        }
        .activity-img{
          width:20px;
          height:20px;
        }
      }
      .list-text{
        opacity: 0.6;
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #1B1E21;
        letter-spacing: 0;
        line-height: 18px;
      }
    }
    .list{
      padding:20px 0 0;
      .list-title{
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #262A2F;
        letter-spacing: 0;
        line-height: 14px;
      }
      .list-text{
        opacity: 0.8;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #262A2F;
        letter-spacing: 0;
        line-height: 18px;
      }
    }
  }
}
</style>
