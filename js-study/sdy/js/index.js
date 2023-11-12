//首页逻辑代码
// 问题：如何在首页知道我登录成功了？
// 通过登录成功之后存储的凭证来证明
// 1.拿到localStorge内的凭证
const token = window.localStorage.getItem('token')
const id = window.localStorage.getItem('id')

//2.判断token和id是否存在
if(!token || !id){
    //没有登录
    $('.off').addClass('active')
    $('.on').removeClass('active')
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
            // 3-2.判断是否登录
            if(res.code !==1){
                $('.off').addClass('active')
                $('.on').removeClass('active') 
                return
            }else{
                $('.on').addClass('active').find('span').text(res.info.nickname)
                $('.off').removeClass('active')
            }
        }
    })
}

// 4.个人中心的跳转
$('button.self').on('click',function () {
    window.location.href = './self.html'
})
//5.退出登录
$('button.logout').on('click',function () {
    //直接发送请求，退出登录
    $.get('http://localhost:8888/users/logout',{id:id},res=>{
        //退出登录后，直接刷新页面
        window.location.reload()
    })
})