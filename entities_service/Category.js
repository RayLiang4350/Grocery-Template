var dbClient = require('../dbManager');
var db_exception = require('../exceptions/db_exception');
async function createCategory(uri,dbname,collectionName,client)
{
    await client.init(uri,dbname);
    var indication = await containsCollection(client,collectionName);
    if (!indication)
    {
        await client.db.createCollection(collectionName);
        client.closeDb();
        return JSON.parse("{\"result\":\"success\"}");
    }
    else
    {
        client.closeDb();
        return JSON.parse("{\"result\":\"fail\",\"type\":\"operation error\",\"reason\":\"duplicate collection\"}");
    }
}
async function deleteCategory(uri,dbname,collectionName,client)
{
    await client.init(uri,dbname);
    var indication = await containsCollection(client,collectionName);
    if(indication)
    {
        try{
            await client.db.collection(collectionName).drop();
            client.closeDb();
            return JSON.parse("{\"result\":\"success\"}");
        }
        catch (e){
            client.closeDb();
            var content = JSON.parse("{\"result\":\"fail\",\"type\":\"db error\",\"reason\":\"MongoError: "+e.message+"\"}");
            return content;
        }
    }
    else
    {
        client.closeDb();
        return JSON.parse("{\"result\":\"fail\",\"type\":\"db error\",\"reason\":\"collection not exist\"}");
    }
}
async function containsCollection(client,collectionName)
{
    var result = false;
    client.collections.forEach(element => {
        if(element.name==collectionName)
        {
           result = true;
        }
    });
    return result;
}
async function getCollectionList(uri,dbname,client)
{
    await client.init(uri,dbname);
    client.closeDb()
    return client.collections;
}
async function renameCollection(uri,dbname,client,targetName,reSetName)
{
    await client.init(uri,dbname);
    var indication = await containsCollection(client,targetName);
    if(indication)
    {
        try{
            await client.db.collection(targetName).rename(reSetName,false);
            client.closeDb();
            return JSON.parse("{\"result\":\"success\"}");
        }
        catch(e)
        {
            client.closeDb();
            return JSON.parse("{\"result\":\"fail\",\"type\":\"db error\",\"reason\":\"MongoError: "+e.message+"\"}");
        }
    }
    else
    {
        client.closeDb();
        return JSON.parse("{\"result\":\"fail\",\"type\":\"db error\",\"reason\":\"collection not exist\"}");
    }
}

module.exports.createCategory = createCategory;
module.exports.deleteCategory = deleteCategory;
module.exports.getCollectionList = getCollectionList;
module.exports.renameCollection = renameCollection;