const {MongoClient} = require('mongodb');

async function connectDb(){
    const dbUri = "mongodb+srv://RayLiang:tH34rwj5XWjZqzgD@test-x7g7w.mongodb.net/test?retryWrites=true&w=majority";
    const db = new MongoClient(dbUri);
    try {
        await db.connect();

        await listDatabases(db);
     
    } catch (e) {
        console.error(e);
    }
    finally {
        await db.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports.connectDb = connectDb;