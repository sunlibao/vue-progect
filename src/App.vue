<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components:{
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
}
  body,html,#app,.container{
    height: 100%;
  }

 body{
      background-image: url(./assets/backgroud-image.jpg) ;
      background-repeat:no-repeat;
      background-size: 100%;
  }



</style>


