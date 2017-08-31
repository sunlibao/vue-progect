<template>
  <div id="user2">
    <!-- 操作按钮-->
    <el-row type="flex"  >
      <el-col :span="24">
        <div class="grid-content bg-purple-dark" style="text-align: right;padding-bottom: 10px;padding-top: 10px;padding-right: 10px;">
          <el-button-group>
            <el-input v-model="params.username" placeholder="请输入用户名" style="width: 120px"  ></el-input>
          </el-button-group>
          <el-button-group >
            <el-button @click="search">查询</el-button>
            <el-button @click="addUser('ruleForm')">添加</el-button>
            <el-button @click="deleteUser(selectRow)">删除</el-button>
            <el-button @click="updateUser(selectRow)">修改</el-button>
            <el-button @click="setRole(selectRow)">设置角色</el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>
    <!--表格显示 -->
    <el-table   highlight-current-row  :data="dataList"  style="width: 100%" @current-change="handleCurrentChange">
      <el-table-column
        prop="id"
        label="id"
        fit="true">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        fit="true">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="用户角色"
        fit="true">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        fit="true">
      </el-table-column>
    </el-table>
    <!--分页标签 -->
    <el-pagination layout="prev, pager, next" @current-change="currentChange"  :total="params.total" :page-size="params.pageSize" :current-page="params.currentPage"> </el-pagination>

    <!-- Form -->
    <el-dialog title="添加权限" :visible.sync="dialogFormVisible"  >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- Form -->
    <el-dialog title="设置用户角色" :visible.sync="dialogUserRoleVisable"  >
      <el-form :model="userRule"  ref="userRule" >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userRule.username"  :disabled="true" ></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="roleId">
          <el-select v-model="userRule.roleId" filterable   placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id+''">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUserRole(userRule)">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>

</template>

<script>

  import md5 from 'js-md5';

  export default{
    name:'user2',
    data(){
      return{
        dataList:[],
        params:{
          total:0,
          page:1,
          pageSize:10,
          username:''
        },
        selectRow:null,
        dialogFormVisible:false, //对话框控制
        ruleForm:{
          id:'',
          username:'',
          password:'',
          dr:''
        },
        rules:{
          username:[
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        },
        roleList:[],
        dialogUserRoleVisable:false,
        userRule:{//用户角色对象
          username:'',
          roleId:'',
          userId:''
        }
      }
    },
    created(){
      this.loadData();
      this.loadRoleList();
    },
    methods:{
      loadData:function () {
        let that = this;
        this.GLOBAL.ajaxPostDefalut("/system/user/findUserPage",that.params,function (msg) {
          that.dataList = msg.data.data;
          that.params.total=msg.data.totalCount;
        })
      },
      handleCurrentChange:function(row){//选中行
        this.selectRow = row;
      },
      currentChange:function (currentPage) {//当前页改变
        this.params.page=currentPage;
        this.loadData();
      },
      search:function (page) {

      },
      submitForm:function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let that = this;
            //对密码进行加密
            var md5str = md5(that.ruleForm.password);
            console.log(md5str);
            that.ruleForm.password = md5str;

            this.GLOBAL.ajaxPostDefalut("/system/user/saveUser",that.ruleForm,function (msg) {
              that.loadData();
              that.$message("操作成功");
              that.dialogFormVisible=false;
            },function (msg) {
              that.$message("操作失败");
            });
          }else {
            console.log('error submit!!');
            return false;
          } });

      },
      updateUser:function (row) {
          if(row){
            this.ruleForm = JSON.parse(JSON.stringify(row));
            this.dialogFormVisible=true;
          }else{
            this.$message("请选择要修改的记录");
          }

      },
      addUser:function (fromName) {
        this.dialogFormVisible=true;
        this.resetForm(fromName)
      },
      resetForm:function (fromName) {
        //定义空的数据对象
        var temp = {
          id:'',
          username:'',
          password:'',
          dr:''};

        this.ruleForm = temp;

      },
      deleteUser:function (row) {
          if(row){
            this.$confirm('您确认要删除当前用户么？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(({ value }) => {//确认删除
              let that = this;
              //操作调用
              this.GLOBAL.ajaxPostDefalut("/system/user/deleteUser",row,function (msg) {
                that.$message("删除成功");
                that.loadData(1);
              },function (msg) {
                that.$message("删除失败");
              })
            }).catch(() => {

            });

          }else{
            this.$message("请选择要删除的数据");
          }
      },
      setRole:function (row) {//设置角色方法
        if(row){

          console.log(row);

          this.dialogUserRoleVisable = true;
          this.userRule.username = row.username;
          this.userRule.userId = row.id;

        }else{
          this.$message('请选择要设置角色的用户');
        }


      },
      loadRoleList:function () {
        let that = this;
        this.GLOBAL.ajaxPostDefalut("/system/role/roleList",that.params,function (msg) {
          that.roleList = msg.data
        },function (msg) {
        })
      },
      submitUserRole:function (userRule) {
        if(userRule){
          let that = this;
            this.GLOBAL.ajaxPostDefalut("/system/user/setUserRole",userRule,function (msg) {
              that.$message("角色设置成功");
              that.dialogUserRoleVisable = false;
              that.loadData();
            })

        }

      }


    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
