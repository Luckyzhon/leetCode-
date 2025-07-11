

function myAjax(){
  //创建对象
  let _ajax = new XMLHttpRequest;
  //开启监听事件
  _ajax.onreadystatechange= function(){
    //当异步请求状态变为 4 时，并且返回状态码为200，接收响应成功
    if(_ajax.readyState ==4 && _ajax.status==200){
      //正确返回数据
    }
  }
  //调用 open 传入三个参数，请求方式(GET,POST),url,同步异步（true/false）
  _ajax.open('get','getStar.php?starName'+ name);

  //发送请求，不带参数为 GET请求
  _ajax.send();

}