<template>
<div class="smart">
    <p class="title">我的TOREAD SMART</p>
    <div v-if="smartList.length !== 0" class="data_box">        
        <div class="box" v-for="(item,index) in smartList" :key="index" @click="toH5">
            <div class="img_box">
                <img :src=item.imgurl alt="">
            </div>
            <div class="info_box">
                <p class="title">{{item.spkmc}}</p>
                <p class="number">{{item.uid}}</p>
            </div>
        </div>
    </div>
    <div class="no_data" v-else>
        <img src="../assets/images/no_smart.png" alt="">
        <p>暂无数据</p>
    </div>
    <p class="title">推荐TOREAD SMART</p>
    <div>        
        <div class="box" @click="toSmart('2')">
            <div class="img_box">
                <img src='../assets/images/man.jpg' alt="">
            </div>
            <div class="info_box">
                <p class="title">春夏新款-男式光变防晒皮肤衣</p>
                <div class="look">立即查看</div>
            </div>
        </div>
        <div class="box" @click="toSmart('1')">
            <div class="img_box">
                <img src='../assets/images/women.jpg' alt="">
            </div>
            <div class="info_box">
                <p class="title">春夏新款-女式光变防晒皮肤衣</p>
                <div class="look">立即查看</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { getNfcInfo } from '@/api/index'
export default {
  name: 'SmartList',
  data () {
    return {
      smartList: [],
    }
  },
  mounted () {
    this.getNfcInfo()
  },
  methods: {
    async getNfcInfo () {
      let res = (await getNfcInfo()).data
      console.log(res)
      if (res.data !== '') {
        this.smartList = res.data
        console.log(this.smartList)
      }
    },
    toH5 () {
      window.location.href = 'https://'+window.location.host+'/Public/nfc/index.html?isfirst=false'
    },
    toSmart(val){
      window.location.href = 'https://'+window.location.host+'/Public//nfc/smart/index.html?type='+val
    }
  }
}
</script>

<style scoped lang="less">
    .smart{
      .title{
        font-size:18px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(0,0,0,1);
        margin-left: 16px;
      }
        margin-top: 20px;
        .box{
            width:343px;
            height:100px;
            background:rgba(247,247,247,1);
            border-radius:8px;
            margin: 10px auto 0 auto;
            display: flex;
            border: 1px solid #f7f7f7;
            .img_box{
                width:100px;
                height:100px;
                img{
                    width:100px;
                    height:100px;
                    object-fit: cover;
                    border-radius: 8px 0 0 8px
                }
            }
            .info_box{
              flex: 1;
              position: relative;
            }
            .title{
                width:191px;
                max-height:40px;
                font-size:14px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(0,0,0,1);
                line-height:20px;
                margin: 20px auto 10px auto;
            }
            .number{
                width:191px;
                height:10px;
                font-size:10px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(102,102,102,1);
                line-height:10px;
                margin: auto;
            }
        }
        .data_box{
          margin-bottom: 40px;
        }
        .no_data{
          margin-bottom: 40px;
          img{
            display: block;
            width: 172px;
            margin: 80px auto 0 auto;
          }
          p{
            font-size:14px;
            font-family:PingFangSC-Light,PingFang SC;
            text-align: center;
            margin-top: 19px;
          }
        }
        .look{
          width:95px;
          height:30px;
          line-height: 30px;
          background:#000000;
          border-radius:13px;
          font-size:14px;
          font-weight:normal;
          color:rgba(255,255,255,1);
          text-align: center;
          margin: auto;
        }
    }
</style>
