<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="form-group">
      <label  class="col-sm-2 control-label" >{{ labelName+':' }}</label>
      <div class="col-sm-8">
        <input name="a" v-model="value" class="form-control"  :placeholder="placeholder"  :maxlength="maxlength" minlength="minlength"  v-on:keyup="onKeyUp"     />
      </div>
      <div class="col-sm-2">
        <span style="color: red;">{{ errorMsg }}</span>
      </div>
  </div>
</template>

<script>

  export default{
    name:'input',
    props:{
      labelName:String,//标签
      placeholder:String,//显示文本
      maxlength:null,//最大长度
      minlength:null,//最小长度
      request:false
    },
    data(){
        return {
          value:'',
          errorMsg:''
        }
     },
    methods:{
      onKeyUp:function () {//键盘弹起事件
          this.$emit('input',this.value);
   },validator:function () {//校验方法
           
   }
    },
    watch:{

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
