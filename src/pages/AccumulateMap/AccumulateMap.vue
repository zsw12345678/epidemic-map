<template>
  <!-- 初始化 echarts 时，需要给其一个确定宽高的盒子-->
  <div class="mapbox" ref="mapbox" style='width:700px; height:510px'></div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import jsonp from 'jsonp'

const option = {
  title: {
    show: true,
    text: '',
    textStyle: {
      lineHeight: 35
    },
    left: 10
  },
  series: [{
    name: '累积确认人数',
    type: 'map', // 渲染地图
    map: 'china', // 渲染中国地图
    top: 20,
    label: { // 控制对应地区汉字
      show: true
    },
    itemStyle: { // 控制背景颜色
      areaColor: '#fff'
    },
    emphasis: { // 控制鼠标滑过的背景色和字体
    },
    data: [] // 用来接收后台请求回来的数据
  }], // 对地图的设置
  visualMap: { // 控制对应区域显示颜色
    type: 'piecewise',
    show: true,
    splitNumber: 7, // 分成7段
    pieces: [ // 分段
      {min: 10000},
      {min: 1000, max: 9999},
      {min: 500, max: 999},
      {min: 100, max: 499},
      {min: 10, max: 99},
      {min: 1, max: 9},
      {min: 0, max: 0}
    ],
    align: 'left',
    orient: 'horizontal', // 水平放置
    inRange: {
      color: ['#fff', '#F9E8CE', '#f7a687', '#ee7a4f', '#D53E34', '#A93431', '#63201C']
    },
    left: 'center',
    bottom: 20,
    itemHeight: 13,
    itemWidth: 13,
    textGap: 8,
    itemGap: 12,
    itemSymbol: 'rect'
  },
  tooltip: { // 提示框组件
    trigger: 'item',
    formatter: '地区：{b}<br/>确诊：{c}人'
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    right: 5,
    top: 'center',
    feature: {
      dataView: {readOnly: false},
      restore: {},
      saveAsImage: {}
    }
  },
  geo: { // 对某一区域单独设置
    regions: [{
      name: '南海诸岛',
      itemStyle: {
        normal: {
          opacity: 0
        },
        label:
          {
            show: false
          }
      }
    }]
  }
}

export default {
  mounted () {
    // 获取数据
    this.getData()
    // 初始化echarts实例
    this.myChart = echarts.init(this.$refs.mapbox)
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option)
  },
  methods: {
    getData () {
      const url = 'http://interface.sina.cn/news/wap/fymap2020_data.d.json?=1580892522427'
      jsonp(url, {}, (err, data) => {
        if (!err) {
          const list = data.data.list.map(item => ({name: item.name, value: item.value}))
          option.series[0].data = list
          option.title.text = '全国累积确诊：' + data.data.gntotal
          option.title.subtext = data.data.times
          this.myChart.setOption(option)
        }
      })
    }
  }
}
</script>

<style>
  .mapbox {
    background-color: #F7F7F7;
    margin: 0 auto;
  }
</style>
