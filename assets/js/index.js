$(function() {


    // 调用
    getUserInfo()

    var layer = layui.layer

    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出？', { icon: 3, title: '提示' }, function(index) {
            // 1. 清空本地存储的 token
            localStorage.removeItem('token')
                // 2. 重新跳转到登录页面
            location.href = '/login.html'


            // 关闭 confirm 询问框
            layer.close(index);
        });

    })
})


// 获取用户的基本信息

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        // headers 就是请求头的配置对象
        // headers: { // 这个headers 是小写的 写成Headers 这个就错了
        //     Authorization: localStorage.getItem('token') || ''
        // },  baseAPI 中已定义

        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)

        },

        // 挂在到了 baseAPI 方便其他需要权限的直接调用
        // 无论成功还是失败， 最终都会调用 complete 回调函数
        // complete: function(res) {
        //     // console.log('执行了complete 回调函数')
        //     // console.log(res)
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空 token
        //         localStorage.removeItem('token')
        //             // 2. 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }

        // }
    });
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
        // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片图像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()

    } else {
        // 3.2 渲染文字头像
        var first = name[0]
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }

}