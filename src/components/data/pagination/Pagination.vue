<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div id="Pagination">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li v-bind:class="{disabled:current==1}" >
          <a  aria-label="Previous"   v-on:click="setCurrentPage(current-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li v-for="value in totalPage "  v-bind:class="{active:current==value}" ><a v-on:click="setCurrentPage(value)" >{{value}}</a></li>

        <li  v-bind:class="{disabled:current==totalPage}">
          <a  aria-label="Next" v-on:click="setCurrentPage(current+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  export default{
    name:'Pagination',
    props:{
        totalSize:{//总记录数
          type:Number,
          default:0
        },
        currentPage:{
          type:Number,
          default:1
         },
        pageSize:{
          type:Number,
          default:10
       }

    },
    data(){
      return{
       current:this.currentPage,
       totalPage:null
      }
    },
    created(){
      //初始化总页数
      let tempPage = (this.totalSize%this.pageSize==0?parseInt(this.totalSize/this.pageSize):parseInt(this.totalSize/this.pageSize)+1);
      //计算总页数
      this.totalPage = tempPage;
    }
    ,watch:{
      totalSize:function (val, oldVal) {
        let tempPage = (this.totalSize%this.pageSize==0?parseInt(this.totalSize/this.pageSize):parseInt(this.totalSize/this.pageSize)+1);
        this.totalPage = tempPage;
      },current:function (val, oldVal) {
         this.$emit("currentChange",this.current);
      }
    },methods:{
      setCurrentPage(page){
        if (page < 1)
          return;
        if (page > this.totalPage)
          return;
        this.current = page;
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
