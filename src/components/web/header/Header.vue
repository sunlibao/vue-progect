<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <nav id="myHeader" class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 10px;">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" >vue学习</a>
        </div>
        <div>
          <ul class="nav navbar-nav navbar-right" v-if="loginData">
            <p class="navbar-text " >欢迎&nbsp;&nbsp; {{loginData.username}}</p>
            <li><a  v-on:click="loginOut" style="cursor: pointer;" ><span class="glyphicon glyphicon-log-in"></span> 退出</a></li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
  export default{
    name:'myHeader',
    data(){
      return{
        loginData:{
          username:''
        }
        //loginData:null

      }
    },created:function () {
      let str = sessionStorage.getItem("username");
      this.loginData.username = str;
      //this.loginData = JSON.parse(str);
    },methods:{
        loginOut:function () {
          let that = this;
          //退出
          that.GLOBAL.ajaxPostDefalut("/logout",'',function () {
              sessionStorage.removeItem("loginKey");//清楚登录key
              sessionStorage.removeItem("sessionUser");//清楚登录用户信息
              sessionStorage.removeItem("username");//清楚登录用户信息
              that.$router.push("/");
          },function () {
              that.$message("操作失败");
          });




      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
