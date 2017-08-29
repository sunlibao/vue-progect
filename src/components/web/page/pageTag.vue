<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="pagePage">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li v-bind:class="{disabled:currentPage==1}" >
          <a  aria-label="Previous"   v-on:click="goPage(currentPage-1)">
              <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="value in totalPage "  v-bind:class="{active:currentPage==value}" ><a v-on:click="goPage(value)" >{{value}}</a></li>

        <li  v-bind:class="{disabled:currentPage==totalPage}">
          <a  aria-label="Next" v-on:click="goPage(currentPage+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  // ""
  export default{
    name:'pagePage',
    props:{
      url:String ,
      pageSize:{
        type: String,
        default:10
    }},
    data(){
      return{
        currentPage:1,
        totalPage:1,
        dataList:[]
      } }
    ,created(){
      var that = this;
      //加载数据
      $.ajax({
        type:"POST",
        url:that.url,
        dataType:"json",
        data:{"param":JSON.stringify({"page":that.currentPage,"pageSize":that.pageSize})},
        beforeSend:function(){
        },
        success:function(msg){

          if(msg.code == '200'){
            that.dataList = msg.data.data;
            that.totalPage=msg.data.totalPage;
            that.getData();
          }else{
              console.log("查询失败")
          }
        },
        error:function(){
          console.log("error")
        }
      })

    },
    methods:{
      getData:function(){
          this.$emit('getData',this.dataList);
          this.$emit('dataList',this.dataList);
      },goPage(page){
        if(page<1)
          return;
        if(page>this.totalPage)
          return;

        this.currentPage = page;
        var that = this;
        //加载数据
        $.ajax({
          type:"POST",
          url:that.url,
          dataType:"json",
          data:{"param":JSON.stringify({"page":page,"pageSize":that.pageSize})},
          beforeSend:function(){
          },
          success:function(msg){
            if(msg.code == '200'){
              that.dataList = msg.data.data;
              that.totalPage=msg.data.totalPage;
              that.getData();
            }else{
              console.log("查询失败")
            }
          },
          error:function(){
            console.log("error")
          }
        })
      }
    }

  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
