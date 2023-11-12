// 注册页面的逻辑代码
$('form').on('submit',function (e) {
    // 1. 阻止默认行为
    e.preventDefault()
  
    // 2. 采集用户信息
    const data = $('form').serialize()
    console.log(data)
  
    // 3. 发送请求
    // jQuery.post(url,data,success(data, textStatus, jqXHR),dataType)
    $.post('http://localhost:8888/users/register',data,res => {
        // 4. 判断结果, 来决定是否提示错误
        if(res.code===0){
            //提示错误
            $('form>span').css('display','block')
            return
        }
        // 5. 跳转页面了
        // 代码能执行到这里, 表示注册成功了
        window.alert('恭喜, 注册成功了, 点击确定跳转到登录页')
        window.location.href='./login.html'
    })
})