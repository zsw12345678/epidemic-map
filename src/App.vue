<template>
  <div id="app">
    <h2>国内疫情地图</h2>
    <div class="choose">
      <span :class="{on: '/extant-map'=== $route.path}" @click="goTo('/extant-map')">现存确诊</span>
      <span :class="{on: '/accumulate-map'=== $route.path}" @click="goTo('/accumulate-map')">累积确诊</span>
    </div>
    <!-- 初始化 echarts 时，需要给其一个确定宽高的盒子-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goTo (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.choose {
  width: 700px;
  height: 40px;
  margin: 0 auto;
  background-color: #D9D9D9;
  border-radius: 4px;
}
.choose > span {
  display: inline-block;
  width: 346px;
  height: 36px;
  line-height: 36px;
  float: left;
  text-align: center;
  font-size: 18px;
  margin: 2px;
  border-radius: 4px;
  cursor: pointer;
}
.choose > span.on {
  background-color: #fff;
  font-weight: 600;
}
</style>
