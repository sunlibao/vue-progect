<template>
  <table class="table table-bordered table-hover">
    <thead>
    <tr>
      <th  v-for="value in columns ">{{value.titleName}}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in items "  @click="select(item)"   v-bind="item"  :id="item.id"   >
      <td>
      </td>
        <td  v-for="value in columns ">{{item[value.valueName]}}</td>
    </tr>
    </tbody>
    <tfoot>
    </tfoot>
  </table>
</template>

<script>

  export default{
    name:'Table',
    props:{
      columns:{
        type:Object,
        default:[]//[{titleName:'',valueName:''},]
      },
      dataList:{
        type:Object,
        default:[]
      }
    },
    data(){
      return{

      }
    },
    computed:{


    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
