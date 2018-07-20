import './base'
import '../../sass/admin/login.scss'
$(function(){
    $(document).keyup(function(event){
        if(event.keyCode ==13){
          $("#loginBtn").trigger("click");
        }
      });
    $('#loginBtn').click(()=>{
        let username=$('#userName').val();
        let password=$('#password').val();
        $.ajax({
            url: '/api/login',
            type: 'post',
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
             
            }
        });
    });
})