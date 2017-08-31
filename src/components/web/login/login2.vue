<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="login" >
    <div style="width: 460px;margin: 0 auto;border: 1px solid #d5d5d5;padding-top: 30px;margin-top:50px;">
      <div style="font-size:24px;background-color: #2aabd2;line-height: 50px;height: 50px;">
         <b><span style="font-style: inherit;">登录</span></b>
      </div>
      <hr/>
      <div class="form-horizontal"  role="form">
        <myInput labelName="用户名" placeholder="请输入用户名"  request="true" v-on:onKeyUp="keyUp"   v-model='userName' ></myInput>
        <myPassword labelName="密码" placeholder="请输入密码"  request="true" v-model="password" ></myPassword>
        <mySubmit label="登录" v-on:click="click" ></mySubmit>
        <div style="color: red;">{{errorMessage}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import  myInput from '../../form/input.vue'
  import  myPassword from '../../form/password.vue'
  import   mySubmit from '../../button/submit.vue'
  import Vue from 'vue'
  import md5 from 'js-md5';




  export default  {
    name: 'login',
    components:{
      myInput,myPassword,mySubmit
    },data(){
        return {
          userName:'',
          password:'',
          errorMessage:''
        }
    },
    methods:{
      click:function () {

        var that = this;

        if(this.validator()){
          var userName = this.userName;//用户名
          var password = this.password;//密码

          $.ajax({
            type:"POST",
            url:that.GLOBAL.baseUrl+"/j_spring_security_check",
            dataType:"json",
            data:{"j_username":userName,"j_password":md5(password)},
            success:function(msg){
            if(msg.code != '200'){
              that.errorMessage = msg.msg;
            }else{
              //登录成功，保存用户信息
              sessionStorage.setItem("loginKey",msg.data.key);
              sessionStorage.setItem("username",msg.data.username);
              that.$router.push('/home')
            }
          },
          error:function(){
            console.log("error")
          }
        }

          )


         /*ajax({
            type:"POST",
            url:"http://localhost:8080/GeneratorCode/user/login",
            dataType:"json",
            data:{"param":JSON.stringify({"userName":userName,"password":password})},
            beforeSend:function(){

            },
            success:function(msg){
              if(msg.code != '200'){
                that.errorMessage = msg.msg;
              }else{
                that.$router.push('/home')
              }
            },
            error:function(){
              console.log("error")
            }
          })*/



        }
      },
      keyUp:function () {

      },validator:function () {

        return true;
      }

    }
  }


</script>

<style>


</style>
