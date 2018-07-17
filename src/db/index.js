const MongoDB = require('mongodb')
const { db: dbConfig } = require('../config');

const mongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;
const handler = {
    get(target, key, proxy) {
        if (key in target) {
            return target[key];
        } else {
            target._collectionName = key;
            return target;
        }
        // Reflect.get(target, key, proxy);
    }
};

class DB {
    static getInstance() {
        if (!DB.instance) {
            DB.instance = new Proxy(new DB(), handler);
        }
        return DB.instance;
    }

    constructor() {
        this.client = null;
        this.connect();
    }
    connect() {
        return new Promise((resolve, reject) => {
            if (!this.client) {
                mongoClient.connect(dbConfig.conStr, { useNewUrlParser: true }, (err, client) => {
                    if (err) {
                        reject(err);
                    } else {
                        this.client = client.db(dbConfig.dbName);
                        resolve(this.client);
                    }
                })
            } else {
                resolve(this.client);
            }
        })
    }
    insert(data) {
        let collectionName = this._collectionName;
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).insert(data, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    remove(cond) {
        let collectionName = this._collectionName;
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).remove(cond, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    update(cond, data) {
        let collectionName = this._collectionName;
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).update(cond, { $set: data }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    find(cond) {
        let collectionName = this._collectionName;
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName)
                    .find(cond)
                    .toArray((err, docs) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(docs);
                        }
                    });
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    getObjectId(id) {
        return new ObjectID(id);
    }
}


module.exports = DB.getInstance()