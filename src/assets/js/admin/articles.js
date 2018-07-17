require('./base')
require('../../sass/admin/articles.scss')

$(function () {
    init();
    initEvents();
})

function init() {
    let simplemde = new SimpleMDE({
        element: $("#mde")[0],
        autoDownloadFontAwesome: false,
        status: false
    });
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
    $(document).on('click','.tag-list li .icon-close',function(){
        $(this).closest('li').remove();
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