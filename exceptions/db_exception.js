var exceptions = require('./exceptions');
const fs = require('fs');
class db_exception extends exceptions
{
    constructor(error,message)
    {
        super(error);
        let json =  JSON.stringify(message);
        try{
            fs.appendFile('./logs/db_exception_log.json',json);
        }
        catch(e)
        {
            console.log(e);
        }
    }
}

module.exports = db_exception;