var {ObjectID} = require('mongodb');
async function getProductInfoWithId(uri,dbname,collectionName,client,objectId)
{
    var response = await client.init(uri,dbname);
    id = new ObjectID(objectId);
    if(response.result == 'success')
    {
        try{
            var object = await client.db.collection(collectionName).find({_id:id}).toArray();
            if(object.length>0)
            {
                var quantity_type = await client.db.collection('Quntity_type').find(object[0].quntity_type).toArray();
                object[0].quntity_type = quantity_type[0];
                client.closeDb();
                return object[0];
            }
            else
            {
                client.closeDb();
                return JSON.parse("{\"result\":\"fail\",\"type\":\"fetch error\",\"reason\":\"item not exist\"}");
            }
        }
        catch(e)
        {
            client.closeDb();
            return JSON.parse("{\"result\":\"fail\",\"type\":\"db error\",\"reason\":\"MongoError: "+e.message+"\"}");
        }
    }
    else
    {
        return response;
    }
}

async function getProductListFromCollection(uri,dbname,collectionName,client)
{
    var response = await client.init(uri,dbname);
    if(response.result == 'success')
    {
        try{
            var object = await client.db.collection(collectionName).find({}).toArray();
            if(object.length>0)
            {
                for(element of object) {
                    var quantity_type = await client.db.collection('Quntity_type').find(element.quntity_type).toArray();
                    element.quntity_type = quantity_type[0];
                };
                client.closeDb();
                return object;
            }
            else
            {
                client.closeDb();
                return JSON.parse("{\"result\":\"fail\",\"type\":\"fetch error\",\"reason\":\"collection has no item\"}");
            }
        }
        catch(e)
        {
            client.closeDb();
            return JSON.parse("{\"result\":\"fail\",\"type\":\"db error\",\"reason\":\"MongoError: "+e.message+"\"}");
        }
    }
    else
    {
        return response;
    }
}
async function insertOneProductToCollection(uri,dbname,collectionName,client,object)
{
    var response = await client.init(uri,dbname);
    if(response.result == 'success')
    {
        try{
              await client.db.collection(collectionName).insertOne(object);
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
        return response;
    }
}

async function removeOneProductFromCollection(uri,dbname,collectionName,client,objectId)
{
    var response = await client.init(uri,dbname);
    id = new ObjectID(objectId);
    if(response.result == 'success')
    {
        try{
            var response = await client.db.collection(collectionName).remove({_id:id});
            if(response.result.n==1)
            {
                client.closeDb();
                return JSON.parse("{\"result\":\"success\"}");
            }
            else
            {
                client.closeDb();
                return JSON.parse("{\"result\":\"fail\",\"type\":\"remove error\",\"reason\":\"removing things not exist\"}");
            }
        }
        catch(e)
        {
            client.closeDb();
            return JSON.parse("{\"result\":\"fail\",\"type\":\"db error\",\"reason\":\"MongoError: "+e.message+"\"}");
        }
    }
    else
    {
        return response;
    }
}

async function updateOneProductFromCollection(uri,dbname,collectionName,client,objectId,changedFileds)
{

}

module.exports.getProductInfoWithId = getProductInfoWithId;
module.exports.getProductListFromCollection = getProductListFromCollection;
module.exports.insertOneProductToCollection = insertOneProductToCollection;
module.exports.removeOneProductFromCollection = removeOneProductFromCollection;
module.exports.updateOneProductFromCollection = updateOneProductFromCollection;