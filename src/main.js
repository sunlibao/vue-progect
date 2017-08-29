// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//var bodyParser = require('body-parser');
import Vue from 'vue'
import App from './App'
import router from './router'
import   $ from 'jquery'
import './assets/bootstrap3.3.7//js/bootstrap.min.js'
import './assets/bootstrap3.3.7/css/bootstrap.min.css'
import Vuelidate from 'vuelidate'
import global_ from './components/web/globar/WebGlobal.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


Vue.prototype.GLOBAL = global_;

//Vue.use(VueResource);
Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.use(ElementUI);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})

//登录校验
router.beforeEach((to, from, next) => {
  if(sessionStorage.getItem("loginKey") || to.path === '/' ){
    console.log("登录");
    next();
  }else{
    console.log("未登录");
    next({path:'/'});
  }

})

