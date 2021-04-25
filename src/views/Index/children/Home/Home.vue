<template>
  <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="home">首页</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="eyes">
        <span>|</span>
        <span>运营总数</span>
      </div>
      <div class="blocks">
        <card-item :homeCardData="homeData"> </card-item>
      </div>

    <div class="data-analysis">
      <div class="analysis-date">
        <div class="analysis">
          <div>|</div>
          <div>经营分析</div>
        </div>
        <div class="dates">
          <el-date-picker
            v-model="date"
            type="datetimerange"
            align="right"
            format="yyyy-MM-dd"
            size="small"
            @change="changeDate"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']">
          </el-date-picker>
        </div>
      </div>
      <div class="chart">
         <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
         <div id="map" class="main" style="width: 90%;height:500px;"></div>
      </div>
    </div>

  </div>

</template>

<script>
import { getDeviceCount } from '../../../../api/device';
import { getLineData } from '../../../../api/order';
import CardItem from './children/card-item.vue';
  export default {
    name: 'Home',
    data(){
      return{
        homeData:{},
        date:'',
        startEndData:{
          start:'',
          end:''
        },
      }
    },
    components: {CardItem},
    created(){
      this.getHomeData();
    },

    mounted(){
      this.getMap();
    },

    methods:{
      // 时间    
      changeDate:function(e){
        console.log(e);
        let date1 = new Date(e[0])
        let y1 = date1.getFullYear()
        let m1 = date1.getMonth() + 1
        m1 = m1 < 10 ? ('0' + m1) : m1
        let d1 = date1.getDate()
        d1 = d1 < 10 ? ('0' + d1) : d1
        const time1 =  y1 + '-' + m1 + '-' + d1;
        let date2 = new Date(e[1])
        let y2 = date2.getFullYear()
        let m2 = date2.getMonth() + 1
        m2 = m2 < 10 ? ('0' + m2) : m2
        let d2 = date2.getDate()
        d2 = d2 < 10 ? ('0' + d2) : d2
        const time2 =  y2 + '-' + m2 + '-' + d2;
        console.log(time1,time2)
        // this.ruleForm.duedate=time;
        this.startEndData.start = time1;
        this.startEndData.end = time2;
        getLineData(this.startEndData).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      },

      // 折线图
      getMap() {
      var myChart = this.$echarts.init(document.getElementById('map'))
      let option = {
          tooltip: {
            trigger: 'axis',
          },
          legend: {
              x:'center',
              y:'bottom',
              data: ['交易金额', '订单数量']
          },
          toolbox: {
              right: 10,
              feature: {}
          },
        grid:{
            left: '3%',
            right: '5%',
            top:'25%',
            bottom: '7%',
            containLabel: true
        },
        xAxis: {
          type: 'category',
          // data: this.dataX,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          boundaryGap: false, //控制日期是否在中间显示
          axisLabel: {
            show: true, //是否显示日期
            interval: 0, //强制显示全部 // rotate: 40,//倾斜的角度
            textStyle: {
              color: '#000', //日期的颜色
              fontSize: 12 //字体的大小
            }
          },
          axisLine: {
            lineStyle: {
              color: '#ccc' // x轴的颜色
            }
          }
        },
        yAxis: {
          type: 'value',
           splitLine: {     //网格线
            "show": true
          },
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#000' //数字的颜色
            },
            inside: false //控制数据是否在内侧还是外侧显示
          },
          axisLine: {
            lineStyle: {
              color: '#ccc' // 折线的颜色
            }
          }
        },
        series: [
           {
            name: '交易金额',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '订单数量',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        }]
      }
      myChart.setOption(option)
      window.onresize = myChart.resize;
    },


      getHomeData(){
        getDeviceCount().then((res) => {
          let temp = res.data.data;
          console.log("-->",temp)
          if(res.data.code == 200){
            this.homeData = temp;
          }
        }).catch((err) => {
          console.log("err",err)
        })
      },
    }
  }
</script>

<style scoped>
  .container{
    width: 100%;
    min-width: 900px;
  }
  .home{
    font-weight: bold;
  }
  .container .blocks{
    width: 100%; 
    margin-top: 15px;
  }
  .eyes{
    width: 100%;
    height: 50px;
    margin-top: 15px;
    background-color: #FFF;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
   .eyes span:first-child{
     color: #FFF;
    margin-left: 10px;
    border-right: 5px solid black;
    padding: 0px;
    font-weight: bold;
  }
  .eyes span:nth-of-type(2){
    margin-left: 20px;
  }
  .analysis-date{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .dates{
    margin-right: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .data-analysis{
    width: 100%;
    height: 600px;
    margin-top: 30px;
    background-color: #FFF;
    border-radius: 5px;
    transition: all 0.25s ease-in-out;
  }
  .data-analysis:hover{
      box-shadow: 0px 0px 10px rgb(170, 170, 170);
  }
  .analysis{
    width: 100%;
    height: 50px;
    margin-top: 15px;
    background-color: #FFF;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .analysis div:first-child{
    color: #FFF;
    margin-left: 10px;
    border-right: 5px solid black;
    padding: 0px;
    font-weight: bold;
  }
  .analysis div:nth-child(2){
    margin-left: 20px;
  }
  .main{
    margin: 0 auto;
    /* border: 1px solid red; */
    box-shadow: 0px 0px 3px rgb(190, 190, 190);
  }

</style>
