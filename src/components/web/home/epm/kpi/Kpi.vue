<template>
    <div id="kpi">
        <el-tabs v-model="activeName"  @tab-click="tabHandleClick">
            <el-tab-pane label="我的KPI" name="first">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark" style="text-align: right;padding-bottom: 10px;padding-top: 10px;padding-right: 10px;">
                      <el-button-group >
                          <el-button>新建</el-button>
                          <el-button>全部提交</el-button>
                          <el-button>删除</el-button>
                      </el-button-group>
                    </div>
                  </el-col>
                </el-row>

              <el-table
                ref="multipleTable"
                :data="kpilist"
                border
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                :fit="true"
              >
                <el-table-column
                  type="selection"
                  width="55" ></el-table-column>
                <el-table-column
                  prop="id"
                  label="序号"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="title"
                  label="标题内容"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="weighting"
                  label="权重"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="imprtance"
                  label="重要性"
                  fit="true">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="紧急性"
                  fit="true">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  fit="true">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, tableData4)"
                      type="text"
                      size="small">
                      移除
                    </el-button>
                </el-table-column>
              </el-table>

            </el-tab-pane>
            <el-tab-pane label="撰写个人自述" name="second">撰写个人自述</el-tab-pane>
            <el-tab-pane label="查看经理评价" name="three">查看经理评价</el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
export default{
  name:'kpi',
  data(){
    return{
      activeName:'first',
      kpilist:[]//我的kpi列表
    }
  },
  methods:{
    tabHandleClick:function (tab, event) {
        console.log(tab)
    },
    handleSelectionChange:function () {

    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #kpi{
      background-color: white;
  }
</style>
