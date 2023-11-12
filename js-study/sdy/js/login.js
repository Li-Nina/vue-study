// 登录页面的逻辑代码
$('form').on('submit',function (e) {
    // 1. 阻止默认行为
    e.preventDefault()
  
    // 2. 采集用户信息
    const data = $('form').serialize()
    console.log(data)//username=xiaohuilang&password=123456
  
    // 3. 发送请求
    // jQuery.post(url,data,success(data, textStatus, jqXHR),dataType)
    $.post('http://localhost:8888/users/login',data,res => {
        // 4. 判断结果, 来决定是否提示错误
        console.log(res)
        if(res.code===0){
            //提示错误
            $('form>span').css('display','block')
            return
        }
        // 5. 登录成功
        // 代码能执行到这里, 表示注册成功了
        // window.location.href='./index.html'
        // 5-1.把登录过的“凭证”存储起来，为了其他页面使用
        window.localStorage.setItem('token',res.token)
        // 5-2.把用户的id信息存储起来
        window.localStorage.setItem('id',res.user.id)
        //5-3.跳转页面
        window.location.href = './index.html'
    })
})