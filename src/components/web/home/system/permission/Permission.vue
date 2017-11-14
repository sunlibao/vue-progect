<template>
  <div id="permission" style="width: 400px;text-align: left;">

    <el-tree
      :data="data2"
      show-checkbox
      default-expand-all
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps">
    </el-tree>

    <div class="buttons">
      <el-button @click="savePermission">保存权限</el-button>
    </div>
    </div>
  </template>

    <script>
      export default {
        created:function () {
          this.loadData();
          this.loadUserData();
        },
        methods: {
          getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes());
          },
          getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
          },
          savePermission(){//保存权限
            console.log(this.$refs.tree.getCheckedKeys());
          },
          setCheckedKeys() {
            this.$refs.tree.setCheckedKeys([3]);
          },
          resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
          },
          loadData() {//加载所有的菜单数据
              var that = this;
              this.GLOBAL.ajaxPostDefalut("/sys/menu/findMenuTree","",function (msg) {
                that.data2 = msg.data;
              })
          },
          loadUserData(){//查询用户数据
            var that = this;
            this.GLOBAL.ajaxPostDefalut("/sys/menu/findUserRightMenu","",function (msg) {
              console.log(msg);
              that.$refs.tree.setCheckedNodes(msg.data);
            })
          }
        },
        data() {
          return {
            data2: [],
            defaultProps: {
              children: 'children',
              label: 'name'
            }
          };
        }
      };
    </script>
