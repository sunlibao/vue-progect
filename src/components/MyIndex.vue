<template>
  <div class="container" style="padding: 0px;margin:5px auto;">
      <MyHeader></MyHeader>
    <div class="row">
          <div class="col-md-3" style="">
            <LeftMenu></LeftMenu>
          </div>
          <div class="col-md-9" style="padding-left: 10px;" >
            <router-view></router-view>
          </div>
    </div>

  </div>
</template>

<script>
  import MyHeader from './web/header/Header.vue'
  import Footer from './web/footer/Footer.vue'
  import LeftMenu from './web/leftMenu/LeftMenu.vue'
  import router from '../router'


export default {
  name: 'MyIndex',
  router,
  data () {
    return {
      msg: 'Welcome to Your Vue.js App，只有学习才能进步,我的世界我做主'
    }
  },components:{
    MyHeader,LeftMenu
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
