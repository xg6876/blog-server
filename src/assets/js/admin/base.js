require('../../sass/iconfont.css');
require('../../sass/base.scss');
require('../../sass/admin/admin.scss');
require('../../sass/admin/menu.scss');

$(function(){
    let path=location.pathname.substr(7);
    $(`.menu-item .icon-${path}`).next().addClass('active');
    $(`.menu-wrap .menu-item a`).click(function(){
        let _path=$(this).attr('path');
        location.href=`/admin/${_path}`;
    })
})