<template>
  <div id="role">
    <el-row type="flex"  >
      <el-col :span="24">
        <div class="grid-content bg-purple-dark" style="text-align: right;padding-bottom: 10px;padding-top: 10px;padding-right: 10px;">
          <el-button-group >
              <el-button @click="dialogFormVisible=true;this.selectRow = null;">添加</el-button>
              <el-button @click="deleteRole(currentRow)">删除</el-button>
              <el-button @click="updateRole(currentRow)">修改</el-button>
              <el-button @click="disabelRole(currentRow)">禁用</el-button>
              <el-button @click="enableRole(currentRow)">启用</el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>

    <el-table   highlight-current-row  :data="aDataList"  style="width: 100%" @current-change="handleCurrentChange">
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
        prop="roleCode"
        label="角色编码"
        fit="true">
      </el-table-column>
      <el-table-column
        prop="stateStr"
        label="角色状态"
        fit="true">
      </el-table-column>
    </el-table>

    <!-- Form -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible"  >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  :label-position="labelPosition">
        <el-form-item label="角色名称" prop="roleName" >
          <el-input v-model="ruleForm.roleName" ></el-input>
        </el-form-item>
        <el-form-item label="角色编号" prop="roleCode">
          <el-input v-model="ruleForm.roleCode" ></el-input>
        </el-form-item>
        <el-form-item label="角色说明" prop="note">
          <el-input v-model="ruleForm.note"  type="textarea" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>



  </div>

</template>

<script>
export default{
  name:"role",
  data(){
    return{
      dataList:[],
      currentRow:null,
      dialogFormVisible:false,
      labelPosition: 'right',
      ruleForm:{
        id:'',
        roleName:'',
        roleCode:'',
        note:'',
        state:'0'
      },
      rules:{
        roleName:[
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        roleCode:[
          { required: true, message: '角色编号不能为空', trigger: 'blur' }
        ],
        note:[
          { max: 35, message: '最多输入35个字', trigger: 'blur' }
        ]
      }

    }
  },computed:{
      aDataList:function () {
          $.each(this.dataList,function (i,n) {
                if(n.state ==0){
                  n.stateStr='正常';
                }else if(n.state ==1){
                  n.stateStr='禁用';
                }
          })
        return  this.dataList;
      }
  },
  created(){
     this.loadData(1);
  },methods:{
    loadData:function (page) {
      let that = this;

      this.GLOBAL.ajaxPostDefalut("/system/role/roleList","",function (msg) {

        if(msg.code == '200'){
          that.dataList = msg.data;
        }else if(msg.code == '30003'){
          this.$message("没有权限操作");
        }
      },function (msg) {
         that.$message("操作失败");
      })
    },
    handleCurrentChange:function (val) {
      this.currentRow = val;
    },
    submitForm:function (ruleForm) {

        let that = this;
        this.GLOBAL.ajaxPost("/system/role/saveRole",ruleForm,function (msg) {
          that.loadData(1);
          that.$message("操作成功");
          that.dialogFormVisible=false;
        },function (msg) {
          that.$message("操作失败");
        });

    },
    resetForm:function (formName) {
      this.$refs[formName].resetFields();
    },
    deleteRole:function (row) {

      if(row){

        this.$confirm('您确认要删除当前角色么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {//确认删除
          let that = this;
          //操作调用
          this.GLOBAL.ajaxPostDefalut("/system/role/deleteRole",row,function (msg) {
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
    updateRole:function (row) {
      this.ruleForm = row;
      this.dialogFormVisible = true;
    },
    disabelRole:function (row) {
      let that = this;
      //设置禁用
      row.state=1;
      this.GLOBAL.ajaxPostDefalut("/system/role/saveRole",row,function (msg) {
        that.loadData(1);
        that.$message("操作成功");
        that.dialogFormVisible=false;
      },function (msg) {
        that.$message("操作失败");
      })

    },
    enableRole:function (row) {

      let that = this;
      //设置启用
      row.state=0;
      this.GLOBAL.ajaxPostDefalut("/system/role/saveRole",row,function (msg) {
        that.loadData(1);
        that.$message("操作成功");
        that.dialogFormVisible=false;

      },function (msg) {
        that.$message("操作失败");

      })

    }

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
