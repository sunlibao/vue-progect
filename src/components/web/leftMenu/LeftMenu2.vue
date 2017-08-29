<template>
  <div class="panel-group" id="accordion">

    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion"
             href="#collapseOne">
            系统管理
          </a>
        </h4>
      </div>
      <div id="collapseOne" class="panel-collapse collapse in">
        <div class="list-group">
            <router-link class="list-group-item"   to="/home/system/user">管理员管理</router-link>
            <router-link class="list-group-item"   to="/home/system/menu">菜单管理</router-link>
            <router-link class="list-group-item"   to="/home/system/role">角色管理</router-link>
            <router-link class="list-group-item"   to="/home/system/permission">权限管理</router-link>
        </div>
      </div>
    </div>


    <div class="panel panel-default" v-if="false">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion"
             href="#collapseTwo">
            日志管理
          </a>
        </h4>
      </div>
      <div id="collapseTwo" class="panel-collapse collapse">
        <div class="panel-body">
          Nihil anim keffiyeh helvetica, craft beer labore wes anderson
          cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo.
        </div>
      </div>
    </div>
    <div class="panel panel-default" v-if="roleCode.ROLE_AMDIN">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion"
             href="#collapseThree">
              站点管理
          </a>
        </h4>
      </div>
      <div id="collapseThree" class="panel-collapse collapse">
        <div class="panel-body">
          Nihil anim keffiyeh helvetica, craft beer labore wes anderson
          cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
          vice lomo.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name:'leftMenu',
  data(){
      return{
        menuList:[],


    }
  },
  created(){

    console.log("加载菜单");

    let that = this;

    this.GLOBAL.ajaxPostDefalut("/resource/findMeanList",'',function (msg) {
      if(msg.code != '200'){
        that.errorMessage = msg.msg;
      }else{
        that.menuList = msg.data;
        console.log(that.menuList);
      }
    },function (msg) {
      that.$message("操作失败");
    })

  }


}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
