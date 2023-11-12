//个人中心的逻辑代码
// 验证登录，如果没有登陆过，那么不会展示该页面
// 1.拿到localStorge内的凭证
const token = window.localStorage.getItem('token')
const id = window.localStorage.getItem('id')

//2.判断token和id是否存在
if(!token || !id){
    //没有登录
    window.location.href = './login.html'
} else {
    //登录过,请求用户信息，把昵称显示出来
    getInfo()
}
//3.请求用户信息
function getInfo(){
    // 3-1.发送请求用户信息
    $.ajax({
        url:'http://localhost:8888/users/info',
        method:'GET',
        data:{id:id},
        headers:{
            authorization:token
        },
        success(res){
            // console.log(res)
            // 3-2.判断已经注销过一次登录，输入self会自动跳转到login
            if(res.code !==1){
                window.location.href = './login.html'
                return
            }else{
                console.log(res)
                //把用户信息进行展示
                $('form .username').val(res.info.username)
                $('form [name=nickname]').val(res.info.nickname)
                $('form [name=age]').val(res.info.age)
                $('form [name=gender]').val(res.info.gender)
            }
        }
    })
}
// 4.修改个人信息
$('form').on('submit',function (e) {
    // 1. 阻止默认行为
    e.preventDefault()
  
    // 2. 采集用户信息
    const data = $('form').serialize()
    console.log(data)//username=xiaohuilang&password=123456
  
    // 3. 发送请求
    // jQuery.post(url,data,success(data, textStatus, jqXHR),dataType)
    $.ajax({
        url:'http://localhost:8888/users/update',
        method:'POST',
        data:data+'&id='+id,
        headers:{
            authorization:token
        },
        success(res){
            console.log(res)
            // 3-2.判断已经注销过一次登录，输入self会自动跳转到login
            // code=1,修改成功
            if(res.code ===1){
                window.alert('修改用户信息成功')
            }
        }
    })
})