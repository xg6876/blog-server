import '../../sass/iconfont.css'
import '../../sass/base.scss'
import '../../sass/admin/admin.scss'
import '../../sass/admin/menu.scss'

$(function(){
    let path=location.pathname.substr(7);
    $(`.menu-item .icon-${path}`).next().addClass('active');
    $(`.menu-wrap .menu-item a`).click(function(){
        let _path=$(this).attr('path');
        location.href=`/admin/${_path}`;
    })
})