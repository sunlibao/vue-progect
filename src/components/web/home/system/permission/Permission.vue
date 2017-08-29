<template>
  <div id="permission">
    <!-- 操作按钮-->
    <el-row type="flex"  >
      <el-col :span="24">
        <div class="grid-content bg-purple-dark" style="text-align: right;padding-bottom: 10px;padding-top: 10px;padding-right: 10px;">
          <el-button-group>
            <el-input v-model="params.roleName" placeholder="请输入角色名称" style="width: 120px"  ></el-input>
            <el-input v-model="params.menuName" placeholder="请输入菜单名称"  style="width: 120px" ></el-input>
          </el-button-group>
          <el-button-group >
            <el-button @click="search">查询</el-button>
            <el-button @click="dialogFormVisible=true;">添加</el-button>
            <el-button @click="deletePermission(currentRow)">删除</el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>

    <el-table   highlight-current-row  :data="dataList"  style="width: 100%" @current-change="handleCurrentChange">
      <el-table-column
        prop="id"
        label="id"
        fit="true">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        fit="true">
      </el-table-column>
      <el-table-column
        prop="menuName"
        label="菜单名称"
        fit="true">
      </el-table-column>
    </el-table>

    <el-pagination layout="prev, pager, next"  :total="params.total" :page-size="params.pageSize" :current-page="params.currentPage"> </el-pagination>


    <!-- Form -->
    <el-dialog title="添加权限" :visible.sync="dialogFormVisible"  >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
        <el-form-item label="角色" prop="roleId">
            <el-select v-model="ruleForm.roleId" filterable   placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id+''">
              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="菜单" prop="resId">
            <el-select v-model="ruleForm.resId" filterable   placeholder="请选择">
              <el-option
                v-for="item in menuList"
                :key="item.id"
                :label="item.name"
                :value="item.id+''">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </div>

</template>

<script>
  export default{
    name:'permission',
    data(){
      return{
          dataList:[],
          params:{
            total:0,
            currentPage:1,
            pageSize:10,
            roleName:'',
            menuName:''
          },
        dialogFormVisible:false,
        ruleForm:{
            id:'',
            roleId:'',
            resId:'',
            roleName:'',
            resName:''
        },
        rules:{
            roleId:[
              { required: true, message: '角色不能为空', trigger: 'blur' }
            ],
            resId:[
            { required: true, message: '菜单不能为空', trigger: 'blur' }
            ]
        }
        ,
        roleList:[],
        menuList:[],
        currentRow:null
      }
    },
    created(){
        this.loadData(1);
        this.loadRoleList();
        this.loadMenuList();
    },
    methods:{
      loadData:function (page) {
        let that = this;
        this.GLOBAL.ajaxPostDefalut("/system/permission/findPermissionPage",that.params,function (msg) {
          that.dataList = msg.data.data;
          that.params.total=msg.data.totalCount;

        },function (msg) {
        })
      },
      loadRoleList:function () {
        let that = this;
        this.GLOBAL.ajaxPostDefalut("/system/role/roleList",that.params,function (msg) {
          that.roleList = msg.data
        },function (msg) {
        })
      },
      loadMenuList:function () {
        let that = this;
        this.GLOBAL.ajaxPostDefalut("/resource/findMeanList",that.params,function (msg) {
          that.menuList = msg.data
        },function (msg) {
        })
      },
      submitForm:function (formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
              let that = this;
              this.GLOBAL.ajaxPostDefalut("/system/permission/savePermission",that.ruleForm,function (msg) {
                that.loadData(1);
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
      handleCurrentChange:function(val){
        this.currentRow = val;
      },
      deletePermission:function (row) {
        let that = this;
        if(row){
          this.$confirm('您确认要删除当前权限么？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {//确认删除
            let that = this;
            //操作调用
            this.GLOBAL.ajaxPostDefalut("/system/permission/deletePermission",row,function (msg) {
              //重新加载数据
              that.loadData();
              that.$message("操作成功");
            })

          }).catch(() => {

          });

        }else{
          this.$message("请选择要删除的记录");
        }
      },
      search:function () {
        this.loadData();
      }



    }


  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .myinput{
    width:100px;
  }
</style>
