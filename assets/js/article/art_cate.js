$(function() {

    var layer = layui.layer
    var form = layui.form

    initArtCateList()

    // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: "/my/article/cates",
            success: function(response) {
                var htmlStr = template('tpl-table', response)
                $('tbody').html(htmlStr)
            }
        });
    }

    var indexAdd = null

    // 为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });

    })


    // 通过代理的形式， 为 form-add 表单绑定 submit 事件
    // body 是一定存在的元素 是代理  然后绑定  #form-add 动态元素 
    $('body').on('submit', '#form-add', function(e) {
        // 阻止表单的的默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: "/my/article/addcates",
            data: $(this).serialize(),

            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')
                    //关闭弹出层
                layer.close(indexAdd)
            }
        });
    })

    var indexEdit = null

    // 通过代理的方式， 为 btn-edit 按钮绑定点击事件
    $('tbody').on('click', '#btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });


        // 获取自定义属性的值
        var id = $(this).attr('data-id')
            // 发起Ajax请求获取对应分类的数据
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(response) {
                form.val('form-edit', response.data)
            }
        });
    })

    // 通过代理的形式， 为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),

            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg('更新失败！')
                }
                layer.msg('更新成功！')

                // 重新获取一下数据
                // 关闭弹出层
                layer.close(indexEdit)
                initArtCateList()
            }
        });
    })


    // 通过代理的方式， 为删除按钮绑定点击事件
    $('tbody').on('click', '#btn-delete', function() {
        var id = $(this).attr('data-id')
            // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //方法里是点击确认之后要做的事情
            $.ajax({
                type: "GET",
                url: "/my/article/deletecate/" + id,
                success: function(response) {
                    if (response.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功')
                        // 再重新获取一下数据
                    initArtCateList()
                    layer.close(index);
                }
            });


        });
    })
})