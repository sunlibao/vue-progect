<template>
  <div id="user" >
    <el-row type="flex"  >
      <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="text-align: right;padding-bottom: 10px;padding-top: 10px;padding-right: 10px;">
              <el-button-group >
                  <el-button @click="dialogFormVisible = true">添加</el-button>
                  <el-button @click="deleteMenu(currentRow)" >删除</el-button>
                  <el-button @click="updateMenu(currentRow)">修改</el-button>
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
        prop="name"
        label="菜单名称"
        fit="true">
      </el-table-column>
      <el-table-column
        prop="url"
        label="访问地址"
        fit="true">
      </el-table-column>
      <el-table-column
        prop="code"
        label="菜单编码"
        fit="true">
      </el-table-column>
    </el-table>

    <!-- Form -->
    <el-dialog title="添加菜单" :visible.sync="dialogFormVisible" >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="菜单名称" prop="name" >
              <el-input v-model="ruleForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="菜单编码" prop="code">
            <el-input v-model="ruleForm.code" ></el-input>
          </el-form-item>
          <el-form-item label="访问地址" prop="url">
            <el-input v-model="ruleForm.url" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

  </div>

</template>

<script>

  export default{
    name:'menuList',
    data(){
      return{
        dataList:[],
        dialogFormVisible:false,
        current:1,//当前页
        ruleForm:{
          id:'',
          name:'',
          code:'',
          url:''//显示地址
        } ,
        rules:{
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' }
          ],
          code:[{
            required: true, message: '请输入菜单编码', trigger: 'blur'
          }],
          url:[{
            required: true, message: '访问显示地址不能为空', trigger: 'blur'
          }]
        },
        currentRow:null
      }
    },
    methods:{
      submitForm:function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            let that = this;

            this.GLOBAL.ajaxPostDefalut("/resource/saveMenu",that.ruleForm,function (msg) {
              if(msg.code != '200'){
                that.errorMessage = msg.msg;
              }else{
                console.log(msg);
                that.$message('保存成功');
                that.loadData(that.current);
                that.dialogFormVisible=false;
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm:function (formName) {
        this.$refs[formName].resetFields();
      },
      loadData:function (page) {
        let that = this;

        this.GLOBAL.ajaxPostDefalut("/resource/findMeanList",'',function (msg) {
          if(msg.code != '200'){
            that.errorMessage = msg.msg;
          }else{
            console.log(msg);
            that.dataList = msg.data;
          }
        },function (msg) {
            that.$message("操作失败");
        })

      },
      deleteMenu:function (row) {//删除数据

        if(row){

          this.$confirm('您确认要删除当前用户么？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(({ value }) => {//确认删除
            let that = this;

            this.GlOBAL.ajaxPostDefalut("/resource/deleteMenu",row,function (msg) {
              if(msg.code != '200'){
                that.errorMessage = msg.msg;
              }else{
                that.$message("删除成功");
                //删除数据
                that.loadData(that.current);
              }
            },function (msg) {
              that.$message("操作失败");
            })

          });

        }else{
            that.$message("请选择要删除的数据")
        }
      },
      handleCurrentChange:function (val) {
        this.currentRow = val;
      },
      updateMenu:function (row) {
        this.dialogFormVisible = true;
        this.ruleForm = row;
      }
    },
    created(){
      this.loadData(1);
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
