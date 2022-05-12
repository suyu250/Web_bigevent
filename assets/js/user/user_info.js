$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: "/my/userinfo",

            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('获取用户信息失败！')

                }

                console.log(response)
            }
        });
    }
})