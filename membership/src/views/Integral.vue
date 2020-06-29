<template>
    <div class="integral">
        <div class="integral-box">
          <div class="con">
            <div class="number">{{total}}</div>
            <p>可用积分</p>
          </div>
          <router-link :to="'IntegralRule'" class="rule"><i class="wenhao"></i><span>积分规则</span></router-link>
          <div class="integral-list">
            <div style="overflow: hidden;padding:0 20px;">
              <div class="tabs" v-for="(tab,i) in tabs" :key="i"
                   :class="[tabIndex === tab.index ? 'tabsActive' : '']"
                   @click="changeSelectTab(tab.index)">
                {{tab.name}}
              </div>
            </div>
            <ul class="ul" v-if="integralList.length>0">
              <li class="list" v-for="(detail, index) in integralList" :key="index">
                <p>
                  <span v-html="detail.pointRule" class="name"></span>
                  <span class="value">{{detail.type === '扣减'?'-':'+'}}{{detail.count}}</span>
                </p>
                <!--时间晚于现在的时间-->
                <p class="text" v-if="detail.isWriteOff">
                  <span class="text1">{{detail.getDate}}</span>
                  <span class="text2">核销中</span>
                </p>
                <p class="text" v-else>{{detail.type === '扣减'?detail.redemDate : detail.getDate}}</p>
              </li>
            </ul>
            <p v-else class="title">暂无{{tabIndex===0?'收入明细':'支出明细'}}~~</p>
          </div>
        </div>
    </div>
</template>

<script>
import {getDetail} from '@/api/index'
export default {
  name: 'Integral',
  data () {
    return {
      tabs: [
        {
          name: '收入明细',
          index: 0
        },
        {
          name: '支出明细',
          index: 1
        }
      ],
      tabIndex: 0,
      addList: [],
      payoutList: [],
      integralList: [],
      total: 0
    }
  },
  activated () {
    this.changeSelectTab(0)
    this.getIntegral()
  },
  methods: {
    timeComputed(time){
      // let list = time.split('/');
      // let year = list[2].split(' ');
      // let str = year[0] +'-'+ list[1] + '-' + list[0] + ' ' + year[1];
      return new Date(time).getTime() > new Date().getTime()
    },
    async getIntegral () {
      let id = this.$route.query.id;
      let par = {
        memberId: id,
        type: '2'
      }
      let res = await getDetail(par)
      if (res.data.code === 1) {
        this.total = res.data.data.total;
        this.addList = res.data.data.income;
        this.payoutList = res.data.data.payout;
        this.integralList = this.addList;
      }
    },
    changeSelectTab (index) {
      this.tabIndex = index
      if (index === 0) {
        this.integralList = this.addList
      } else if (index === 1) {
        this.integralList = this.payoutList
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/common";
.integral{
  position:relative;
  .integral-list{
    background: #F7F7F7;
    border-radius:25px 25px 0 0 ;
    padding-top:24px;
    margin-top:20px;
    width:100%;
    .tabs{
      float:left;
      width:50%;
      height:46px;
      color:rgba(27,30,33,0.4);
      text-align:center;
      line-height:46px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(27,30,33,0.4);
    }
    .tabsActive{
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: rgba(27,30,33,1);
      background:#FFFFFF;
      border-radius: 5px 5px 0 0;
      box-shadow: 0 8px 8px 0 rgba(26,24,36,0.02);
    }
    .title{
      padding:30px 20px 40px 20px;
      background:#FFFFFF;
      text-align: center;
    }
    .ul{
      padding:30px 20px 40px 20px;
      background:#FFFFFF;
      //border-bottom:0.5px solid rgba(24,32,36,0.08);
      .list{
        margin-bottom:20px;
        .name{
          font-size: 14px;
          color: #1B1E21;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 80%;
        }
        .text{
          font-size:12px;
          color:rgba(27,30,33,0.4);
          margin-top:3px;
          .text2{
            float:right;
          }
        }
        .value{
          font-size: 14px;
          color: #B88969;
          float:right;
        }
      }
    }
  }
}
</style>
