// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// 08-19.1
// import store from './vuex/store'

// rem
import "./js/flexible"
//导入字体样式
import "./styles/fontstyle.css"
import "./styles/base.scss"


//其他页面在使用axios的时候直接  this.$http就可以了
Vue.prototype.$http = axios  

//使用mintUI插件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//全局定义alert弹窗层
window.alert=function(msg){
	Vue.$toast({
	  message: msg,
//	  position: 'bottom',
	  duration: 1000
	})
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
