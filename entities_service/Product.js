var {ObjectID} = require('mongodb');
async function getProductInfoWithId(uri,dbname,collectionName,client,objectId)
{
    var response = await client.init(uri,dbname);
    id = new ObjectID(objectId);
    if(response.result == 'success')
    {
        try{
            var object = await client.db.collection(collectionName).findOne({_id:id});
            if(typeof(object.quntity_type)!="undefined")
            {
                var quantity_type = await client.db.collection('Quntity_type').find(object.quntity_type).toArray();
                object.quntity_type = quantity_type[0];
            }
            client.closeDb();
            return object;
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
                    if(typeof(element.quntity_type)!="undefined")
                    {
                         var quantity_type = await client.db.collection('Quntity_type').find(element.quntity_type).toArray();
                         element.quntity_type = quantity_type[0];
                    }
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

async function getOneProductWithAttributes(uri,dbname,collectionName,client,attributes)
{
    var response = await client.init(uri,dbname);
    if(response.result == 'success')
    {
        try{
            var object = await client.db.collection(collectionName).findOne(attributes);
            if(typeof(object.quntity_type)!="undefined")
            {
                var quantity_type = await client.db.collection('Quntity_type').find(object.quntity_type).toArray();
                object.quntity_type = quantity_type[0];
            }
            client.closeDb();
            return object;
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
async function getProdcutListWithAttributes(uri,dbname,collectionName,client,attributes)
{
    var response = await client.init(uri,dbname);
    if(response.result == 'success')
    {
        try{
            var object = await client.db.collection(collectionName).find(attributes).toArray();
            for(element of object) {
                if(typeof(element.quntity_type)!="undefined")
                {
                   var quantity_type = await client.db.collection('Quntity_type').find(element.quntity_type).toArray();
                   element.quntity_type = quantity_type[0];
                }
            };
            client.closeDb();
            return object;
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
              var response = await client.db.collection(collectionName).insertOne(object);
              var objectId = response.insertedId.toString();
              client.closeDb();
              return JSON.parse("{\"result\":\"success\",\"objectId\":\""+objectId+"\"}");
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

function generateUpdateQuery(oldObject,newObject)
{
    var result = {$set:{}};
    for(let [key,value] of Object.entries(newObject))
    {
        if(oldObject[key]!=value)
        {
            result.$set[key] = newObject[key];
        }
    }
    return result;
}

async function updateOneProductFromCollection(uri,dbname,collectionName,client,objectId,newObject)
{
    var response = await client.init(uri,dbname);
    var id = new ObjectID(objectId);
    if(response.result == 'success')
    {
        try{
             var oldObject = (await client.db.collection(collectionName).find({_id:id}).toArray())[0];
             var updateQuery = generateUpdateQuery(oldObject,newObject);
             var response = await client.db.collection(collectionName).updateOne(
                {_id:id},
                updateQuery
            );
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


module.exports.getProductInfoWithId = getProductInfoWithId;
module.exports.getProductListFromCollection = getProductListFromCollection;
module.exports.getOneProductWithAttributes = getOneProductWithAttributes;
module.exports.getProductListWithAttributes = getProdcutListWithAttributes;
module.exports.insertOneProductToCollection = insertOneProductToCollection;
module.exports.removeOneProductFromCollection = removeOneProductFromCollection;
module.exports.updateOneProductFromCollection = updateOneProductFromCollection;