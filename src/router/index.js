/*
  路由器模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import ExtantMap from '../pages/ExtantMap/ExtantMap'
import AccumulateMap from '../pages/AccumulateMap/AccumulateMap'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/extant-map'
    },
    {
      path: '/extant-map',
      component: ExtantMap
    },
    {
      path: '/accumulate-map',
      component: AccumulateMap
    }
  ]
})
