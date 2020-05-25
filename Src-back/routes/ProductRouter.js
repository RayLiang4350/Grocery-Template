const prodcutService = require('../entities_service/Product');
const express = require('express');
var router = express.Router();
var DbClient = require('../dbManager');
const fs = require("fs");
const appSettings = JSON.parse(fs.readFileSync("./Src-back/appSettings.json"));

router.get('/:catName',function(req,res){
    let collectionName = req.params.catName;
    const dbUri = appSettings.database.mongo_uri;
    const dbName = appSettings.database.product_database_name;
    // let page = (req.query.page!=undefined && req.query.page!=0)?req.query.page:1;
    // let limit = (req.query.page!=undefined && req.query.page!=0)?req.query.page:appSettings.customer.page_display_limit;

    // let startValue;
    // let endValue;

    // if(page>0)
    // {
    //     startValue = (page*limit)-limit;
    //     endValue = page*limit;
    // }
    // else
    // {
    //     startValue = 0;
    //     endValue = limit;
    // }

    var client = new DbClient();

    var productionList = prodcutService.getProductListFromCollection(dbUri,dbName,collectionName,client);

    productionList.then(function(result)
    {
        res.send(result);
    });


})


module.exports = router;