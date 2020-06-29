<template>
  <div class="ActivityList" @click="Refresh">
    <div class="list" v-show="!isLoading && !isFailure">
      <ul class="activity-box">
        <li class="activity-item" v-for="(item, index) in list" :key="index" @click="goDetail(item.url)">
          <img class="activity-img"  :src="item.image_url"/>
          <div class="activity-title" :class="{'gray':item.status===1}">{{item.name}}</div>
          <div class="activity-date-box" :class="{'gray':item.status===1}">
            时间：{{formatTime(item.starttime)}} - {{formatTime(item.endtime)}}
          </div>
          <img class="used-img" v-if="item.status===1" src="../assets/images/active-end.png"/>
        </li>
      </ul>
      <div class="no-more"
           v-if="!hasMore"> ~~ 我是有底线哒 ~~ </div>
      <div class="loading" v-if="listLoading"> ~~ 加载中 ~~ </div>
      <div class="loading" v-if="listFailure"> ~~ 加载失败,请再次尝试 ~~ </div>
    </div>
    <div class="is-loading" v-if="isLoading">
      <img src="../assets/images/loading.png"/>
      <p>数据加载中，请稍后...</p>
    </div>
    <div class="is-loading" v-if="isFailure">
      <img src="../assets/images/failure.png"/>
      <p>加载失败，点击页面刷新</p>
    </div>
  </div>
</template>

<script>
import { getActivityList } from '@/api/index'
export default {
  name: 'ActivityList',
  data () {
    return {
      list: [],
      count: 1,
      currentPage: 1,
      hasMore: true,
      isLoading: false,
      isFailure: false,
      listLoading: false,
      listFailure: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scroll, false)
    this.activityList();
  },
  destroyed () {
    window.removeEventListener('scroll', this.scroll) //  离开页面清除（移除）滚轮滚动事件
  },
  methods: {
    Refresh () {
      if (this.isFailure) {
        this.list = [];
        this.currentPage = 1;
        this.activityList();
      }
    },
    formatTime (time) {
      const str = time.replace(/-/g, '/')
      const date = new Date(str);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return year + '.' + month + '.' + day
    },
    goDetail (url) {
      window.location.href = url;
    },
    async activityList () {
      try {
        if (!this.listLoading) {
          this.isLoading = true;
        }
        this.listFailure = false;
        this.isFailure = false;
        let params = {
          currentPage: this.currentPage,
          pagesize: 5,
        }
        const resp = await getActivityList(params);
        if (resp.data.code === 1) {
          this.list = this.list.concat(resp.data.data.activityList);
          this.count = resp.data.data.count;
          this.hasMore = this.count > this.currentPage
          this.listLoading = false;
          this.currentPage = this.currentPage + 1;
        } else {
          if (this.listLoading) {
            this.isFailure = true;
          } else {
            this.listFailure = true;
          }
        }
      } catch (e) {
        if (this.listLoading) {
          this.listFailure = true;
        } else {
          this.isFailure = true;
        }
      }
      this.isLoading = false;
    },
    scroll () {
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      // 设备/屏幕高度
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let scrollObj = document.querySelector('.ActivityList') // 滚动区域
      let scrollHeight = scrollObj.scrollHeight // 滚动条的总高度
      if (scrollTop + clientHeight === scrollHeight) {
        // div 到头部的距离 + 屏幕高度 = 可滚动的总高度
        // 滚动条到底部的条件
        if (this.hasMore && !this.listLoading) {
          this.listLoading = true
          this.activityList()
        }
      }
    }
  }
}

</script>

<style scoped lang="less">
  @import "../assets/common";
  .ActivityList{
    padding:30px 20px;
    .no-more, .loading{
      font-size:12px;
      color:rgba(24,32,36,0.6);
      text-align: center;
      margin-top:30px;
    }
  }
</style>
