<template>
  <div id="login">
      <div  class="panel panel-default">
        <div class="panel-heading">登录</div>
        <div class="panel-body">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  >
            <el-form-item label="用户名" prop="username" >
                <el-input type="text" v-model="ruleForm.username" placeholder="请输入您的用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" placeholder="请输入您的密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button  @click="submitForm('ruleForm')"  type="primary" style="width: 80%;">登录</el-button>
            </el-form-item>
        </el-form>
        </div>
      </div>

  </div>
</template>

<script>
  import md5 from 'js-md5';

  export default{
    name:"login",
    data(){return{
      ruleForm:{
        username:'',
        password:''
      },
      rules:{
        username:[
          { required: true, message: '请输入用户名称', trigger: 'blur' }
       ],
       password:[
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      labelpostion:'right'

    }},
    methods:{
      submitForm:function (formName) {

        this.$refs[formName].validate(valid=>{
          if(valid){
            let that = this;
            //请求数据-being
            $.ajax({
                type:"POST",
                url:that.GLOBAL.baseUrl+"/j_spring_security_check",
                dataType:"json",
                data:{"j_username":that.ruleForm.username,"j_password":md5(that.ruleForm.password)},
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
                  this.$message("登录失败")
                }
              }
            )
            //请求数据-end

          }

        })

      }
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #login{
    margin: 0 auto ;
    padding-top: 150px;
    width: 300px;
    height: 300px;
  }

</style>
