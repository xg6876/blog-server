import './base'
import '../../sass/admin/articles.scss'
import utils from '../utils'

let currentId,
    simplemde;

$(function () {
    init();
    initEvents();
})

function init() {
    simplemde = new SimpleMDE({
        element: $("#mde")[0],
        autoDownloadFontAwesome: false,
        status: false
    });
    getArticles();
}

function initEvents() {
    $('.tag-add').click(function () {
        if ($('.tag-list ul li').length >= 5) {
            alert('最多5个标签');
            return;
        }
        let id = $('.tag-select').val();
        let text = $('.tag-select :selected').text();
        if (!$(`.tag-list li[data-id='${id}']`).length) {
            $('.tag-list ul').append(getTagHtml({
                id,
                text
            }));
        }
    });
    $(document).on('click', '.tag-list li .icon-close', function () {
        $(this).closest('li').remove();
    });
    $('.btnGroup_save').click(function () {
        let currentId=$('#edit-content').data('id');
        if (currentId) {
            addArticle(currentId);
        } else {
            addArticle();
        }
    });

    $(document).on('click','.list-content li',function(){
        let id=$(this).data('id');
        getArticle(id);
    });
}

function getTagHtml({ id, text }) {
    let html = `<li data-id="${id}">
    <div class="tag-item" >
        <span>${text}</span>
        <i class="iconfont icon-close"></i>
    </div>
</li>`;
    return html;
}

function getArticleItem(data) {
    let html = ` <li data-id="${data._id}">
        <div class="list-item-wrap">
            <span class="item-name">${data.title}</span>
            <span>${utils.formatDate(new Date(data.time),'yyyy-MM-dd hh:mm:ss')}</span>
        </div>
    </li>`;
    return html;
}

function getArticles() {
    $.ajax({
        url:'/api/articles',
        type: 'get',
        success: function (res) {
            if (res.code == 200) {
                let html='';
                $.each(res.data, function (index, item) {
                    html+=getArticleItem(item);
                });
                $('.list-content').html(html);
            }
        },
        error: function (res) {
        }
    });
}

function getArticle(id) {
    $.ajax({
        url:`/api/articles/${id}`,
        type: 'get',
        success: function (res) {
            if (res.code == 200&&res.data) {
                let {_id:id,tags,markContent,title}=res.data;
                let html='';
                $('.tag-list ul').empty();
                $.each($('.tag-select option'),function(index,item){
                    let id=$(item).val();
                    let text=$(item).text();
                    if(tags.indexOf($(item).val())!=-1){
                        html+=getTagHtml({
                            id,
                            text
                        })
                    }
                })
                $('#edit-content').data('id',id)
                $('#title').val(title);
                $('.tag-list ul').append(html);
                simplemde.value(markContent);
            }
        },
        error: function (res) {
        }
    });
}


function addArticle(currentId) {
    let title = $.trim($('#title').val());
    if (!title) {
        alert('请输入标题');
        return;
    }
    let tags = $('.tag-list ul li');
    if (!tags.length) {
        alert('请选择标签');
        return;
    }
    let tagIds = '';
    $.each(tags, function (index, item) {
        tagIds = tagIds + $(item).data('id') + ',';
    })
    tagIds = tagIds.substring(0, tagIds.length - 1);
    let type='post';
    let data={
        title,
        markContent: simplemde.value(),
        content: simplemde.markdown(simplemde.value()),
        tags: tagIds
    };
    if(currentId){
        type='put'
        data._id=currentId
    }
    $.ajax({
        url: '/api/articles',
        type,
        data,
        success: function (res) {
            if (res.code == 200) {
                location.href = 'articles'
            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
        }
    });
}

function updateArticle(aid) {
    $.ajax({
        url: '/api/login',
        type: 'post',
        data: {
            username,
            password
        },
        success: function (res) {
            if (res.code == 200) {
                location.href = 'articles'
            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            debugger;
        }
    });
}