require('./base')
require('../../sass/admin/articles.scss')

$(function () {
    let simplemde = new SimpleMDE({
        element: $("#mde")[0], 
        autoDownloadFontAwesome: false,
        status: false
    });
})
console.log(SimpleMDE);