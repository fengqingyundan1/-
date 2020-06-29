<template>
<div class="growth-value">
  <div class="growth-box">
    <div class="con">
      <div class="number">{{total}}</div>
      <p>成长值</p>
    </div>
    <router-link :to="'GrowthValueRule'" class="rule"><i class="wenhao"></i><span>成长值规则</span></router-link>
    <div class="growth-list">
      <template v-if="growthValueList.length>0">
        <div v-for="(detail, index) in growthValueList" class="list" :key="index">
          <span v-html="detail.pointRule" class="name"></span>
          <span class="value">{{detail.type === '累计'?'+':'-'}}{{detail.count}}</span>
        </div>
      </template>
      <p v-else class="title">暂无成长值～～</p>
    </div>
  </div>
</div>
</template>

<script>
import {getDetail} from '@/api/index'
export default {
  name: 'GrowthValue',
  data () {
    return {
      growthValueList: [],
      total: 0
    }
  },
  activated () {
    this.getGrowthValue()
  },
  methods: {
    async getGrowthValue () {
      let id = this.$route.query.id;
      let par = {
        memberId: id,
        type: '1'
      };
      let list = [];
      let res = await getDetail(par)
      if (res.data.code === 1) {
        this.total = res.data.data.total;
        let payout = res.data.data.payout.map((obj)=>{
          obj.getDate = obj.redemDate
          return obj;
        })
        list = list.concat(res.data.data.income,payout);
        this.growthValueList = list.sort(this.compare('getDate'));
      }
    },
    compare(property){
      return function(a,b){
        let value1 = a[property].replace(/-/g, '/');
        let value2 = b[property].replace(/-/g, '/');
        return new Date(value2)-new Date(value1);
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../assets/common";
.growth-value{
  .growth-list{
    .title{
      text-align:center;
    }
    padding:30px 20px 40px 20px;
    background:#FFFFFF;
    border-radius: 25px 25px 0 0;
    margin-top:20px;
    .list{
      margin-bottom:10px;
      height:42px;
      line-height:42px;
      .name{
        font-size: 14px;
        color: #1B1E21;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 80%;
      }
      .value{
        font-size: 14px;
        color: #B88969;
        float:right;
      }
    }
  }
}
</style>
