const db=require('../db');

const getTag=async (ctx)=>{
    return await db.tags.find({});
}

const addTag=async (ctx)=>{
    const { tagName } = ctx.request.body;
    let result = await db.tags.find({name:tagName});
    if(result.length){
        ctx.body={
            code:10015,
            msg:'数据已存在'
        };
    }else{
        let data={name:tagName};
        result=await db.tags.insert(data);
        ctx.body={
            code:200,
            data: {
                id:data._id
            }
        };
    }
}

const delTag=async (ctx)=>{
    const { id } = ctx.request.body;
    let result = await db.tags.remove({_id:db.getObjectId(id)});
    if(result.result.ok){
        ctx.body={
            code:200
        };
    }else{
        ctx.body={
            code:10016,
            msg:'操作失败'
        };
    }
}

module.exports={
    getTag,
    addTag,
    delTag
}
