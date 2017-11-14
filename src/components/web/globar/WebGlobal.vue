<script type="text/javascript">


  /**
   * 检查用户的登录状态
   */
  function checkLogin() {
    let key =  sessionStorage.getItem("loginKey");
    if(!key){
      alert("当前登录已经退出,请重新登录");
      this.$router.push("/")
    }
  }


  /**
   * 异步请求方法
   * @param url 请求地址
   * @param _param 请求参数
   * @param _success 操作成功调用
   * @param _error 操作失败调用
   */
  function  ajaxPostDefalut(url,_param,_success,_error){
  var _url = baseUrl+url+";jsessionid="+sessionStorage.getItem("loginKey");
    console.log(_url);
    $.ajax({
      type:"POST",
      url:_url,
      dataType:"json",
      data:{"param":JSON.stringify(_param)},
      beforeSend:function(){

      },
      success:_success,
      error:_error
    });


  }


 // const baseUrl = "http://www.211314buy.com:8070/GeneratorCode";
  const baseUrl = "http://localhost:8070/GeneratorCode";

  export default
  {
    baseUrl,
    checkLogin,
    ajaxPostDefalut
  }
</script>
