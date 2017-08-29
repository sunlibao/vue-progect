<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default"  v-on:click="click" >{{ label }}</button>
    </div>
  </div>
</template>

<script>
  export default{
    name:'button',
    props:{
      label:String
    },
    methods:{
      click:function () {
            this.$emit('click');
      }
    }
  }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
