const db=require('../db');

const getTag=async (ctx)=>{
    return await db.tags.find({});
}

const addTag=async (ctx)=>{
    const { tagName } = ctx.request.body;
    let result = await db.tags.find({tagName});
    if(result.length){
        let token = updateToken(ctx,{uid:1});
        return ctx.body={
            code:10015,
            msg:'数据已存在'
        };
    }else{
        let data={name:tagName};
        result=await db.tags.insert(data);
        return ctx.body={
            code:200,
            data: {
                id:data._id
            }
        };
    }
}

module.exports={
    getTag,
    addTag
}
