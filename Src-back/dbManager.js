const {MongoClient} = require('mongodb');

class DbClient{
    client;
    db;
    collections;
    async init(uri,name)
    {
        this.client = new MongoClient(uri);
        try {

            await this.client.connect();

            this.db = this.client.db(name);

            this.collections = await this.db.listCollections().toArray();

            return JSON.parse("{\"result\":\"success\"}");
         
        } catch (e) {
            return JSON.parse("{\"result\":\"fail\",\"reason\":\"MongoError: "+e.message+"\"}");
        }
    }

    closeDb(){
        try{
            this.client.close();
            return JSON.parse("{\"result\":\"success\"}");
        }
        catch(e)
        {
            return JSON.parse("{\"result\":\"fail\",\"reason\":\"MongoError: "+e.message+"\"}");
        }
    }
}

module.exports = DbClient;