const config = {
    auth: {
        jwt: {
            secret: 'eC5nXzI1NjY=',            
            exprisesIn: 600
        },
        session:{

        }
    },
    db:{
        conStr:'mongodb://localhost:27017',
        dbName:'blog'
    },
    service:'mongodb',//mongoose
};

module.exports=config