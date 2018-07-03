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
               debugger;
            },
            error: function(res) {
                debugger;
             }
        });
    });
})