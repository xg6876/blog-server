require('./base')
require('../../sass/admin/login.scss')
$(function(){
    $('#loginBtn').click(()=>{
        let username=$('#userName').val();
        let password=$('#password').val();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: {
                username,
                password
            },
            success: function(res) {
               if(res.code==200){
                   location.href='articles'
               }else{
                   alert(res.msg);
               }
            },
            error: function(res) {
                debugger;
             }
        });
    });
})