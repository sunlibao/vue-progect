<template>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="button" class="btn btn-default">{{ label }}</button>
    </div>
  </div>
</template>

<script>
  export default{
    name:'button',
    props:{
      label:String
    }
  }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
