<template>
  <div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu  :default-active="activeIndex"  :router="isRouter" class="el-menu-vertical-demo"  @open="handleOpen" @close="handleClose" :collapse="isCollapse" @select="selectMenu"  >
      <el-submenu index="1" >
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item index="/home/system/user" v-if="roleCode.ROLE_ADMIN">
            管理员管理
        </el-menu-item>
        <el-menu-item index="/home/system/menu" v-if="roleCode.ROLE_MENU | roleCode.ROLE_ADMIN">
            菜单管理
        </el-menu-item>
        <el-menu-item index="/home/system/role" v-if="roleCode.ROLE_ROLE | roleCode.ROLE_ADMIN ">
            角色管理
        </el-menu-item>
        <el-menu-item index="/home/system/permission" v-if="roleCode.ROLE_PERMISSION | roleCode.ROLE_ADMIN">
            权限管理
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="2" v-if="false">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" v-if="false">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>
  </div>

</template>


<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }


</style>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        isRouter:true,
        roleCode:{
          ROLE_ADMIN:false,
          ROLE_ROLE:false,
          ROLE_MENU:false,
          ROLE_PERMISSION:false
        },
        activeIndex:''

      };
    },
    created(){
      this.loadUserMenu();
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      loadUserMenu:function () { //加载用户的菜单

        let that = this;
        //加载用户菜单
        this.GLOBAL.ajaxPostDefalut("/system/user/loadUserMenu","",function (msg) {
              $.each(msg.data,function (i,n) {
                console.log(n.authority);
                for(var  key in that.roleCode){
                      if(n.authority == key){
                        that.roleCode[key] = true;
                      }
                }
              })
        });

      },
      selectMenu:function (index) {
        this.activeIndex = index;
        console.log(index);
      }
    }
  }
</script>
