const db = require('../db');

const getArticles = async (ctx) => {
    let result=await db.articles.find({});
    ctx.body = {
        code: 200,
        data: result
    };
}

const getArticle = async (ctx) => {
    let result=await db.articles.find({_id:db.getObjectId(ctx.params.id)});
    ctx.body = {
        code: 200,
        data: result.length?result[0]:null
    };
}

const addArticle = async (ctx) => {
    const { title,markContent, content,tags } = ctx.request.body;
    let datetime = Date.now();
    let result = await db.articles.insert({
        title,
        markContent,
        content,
        tags,
        time:datetime,
        updateTime:datetime,
        publishState:0
    });
    if(result.result.ok){
        ctx.body = {
            code: 200,
            data: {
                id: result.ops[0]._id
            }
        };
    }else{
        ctx.body={
            code:10016,
            msg:'操作失败'
        };
    }
}
const updateArticle = async (ctx) => {
    const {_id:id, title,markContent, content,tags } = ctx.request.body;
    let datetime = Date.now();
    let result = await db.articles.update({_id:db.getObjectId(id)},{
        title,
        markContent,
        content,
        tags,
        updateTime:datetime
    });
    if(result.result.ok){
        ctx.body = {
            code: 200,
            data: {
                id
            }
        };
    }else{
        ctx.body={
            code:10016,
            msg:'操作失败'
        };
    }
}

module.exports = {
    getArticles,
    getArticle,
    addArticle,
    updateArticle
}
