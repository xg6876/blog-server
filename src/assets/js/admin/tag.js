require('./base')
require('../../sass/admin/tag.scss')

$(function () {
    // devtools = /./;
    // devtools.toString = function () {
    //     this.opened = true;
    // }

    // console.log('%c', devtools);
    // setInterval(() => {
    //     devtools.opened = false;
    //     console.log('%c', devtools);
    //     devtools.opened && alert('速度关闭调试')
    // }, 2000);
    bindEvent();
})

function bindEvent() {
    $('#btn-add-tag').click(() => {
        let tagName = $('#tag-text').val();
        if (tagName) {
            $.ajax({
                url: '/api/tag',
                type: 'post',
                data: {
                    tagName
                },
                success: function (res) {
                    if (res.code == 200) {
                        location.reload();
                    } else {
                        alert(res.msg);
                    }
                },
                error: function (res) {

                }
            });
        }
    });

    $(document).on('click', '.tag-item .icon-close', function(){
        let id = $(this).data('id');
        if (id) {
            $.ajax({
                url: '/api/tag',
                type: 'delete',
                data: {
                    id
                },
                success: function (res) {
                    if (res.code == 200) {
                        location.reload();
                    } else {
                        alert(res.msg);
                    }
                },
                error: function (res) {

                }
            })
        }
    })
}