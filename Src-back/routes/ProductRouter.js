const prodcutService = require('../entities_service/Product');
const express = require('express');
var router = express.Router();
var DbClient = require('../dbManager');
const fs = require("fs");
const appSettings = JSON.parse(fs.readFileSync("./Src-back/appSettings.json"));

//database const
const dbUri = appSettings.database.mongo_uri;
const dbName = appSettings.database.product_database_name;
const product_collection_name = appSettings.database.product_collection_name;
const category_collection_name = appSettings.database.category_collection_name;


//customer web const
const default_page = appSettings.customer.default_page_display;
const default_limit = appSettings.customer.default_page_display_limit;
const default_sort = appSettings.customer.default_sort_product;
const default_ascending = appSettings.customer.default_ascending;



router.get('/',function(req,res){
    let page = (req.query.page!=undefined && req.query.page!=0)?parseInt(req.query.page):default_page;
    let limit = (req.query.limit!=undefined && req.query.limit!=0)?parseInt(req.query.limit):default_limit;
    let sort = (req.query.sort!=undefined)?req.query.sort:default_sort;
    let ascending = (req.query.ascending!=undefined)?(req.query.ascending=='true'):default_ascending;

    let startValue = (page>0)?((page*limit)-limit):0;

    var client = new DbClient();

    var productionList = prodcutService.getProductListFromCollection(dbUri,dbName,product_collection_name,category_collection_name,client,sort,ascending,startValue,limit);

    productionList.then(function(result)
    {
        res.send(result);
    });


})
router.get('/:objectId',function(req,res){

    let objectId = req.params.objectId;

    var client = new DbClient();

    var product = prodcutService.getProductInfoWithId(dbUri,dbName,client,objectId,product_collection_name,category_collection_name);

    product.then(function(result)
    {
        res.send(result);
    });


})
router.get('/category/:categoryId',function(req,res){
    let page = (req.query.page!=undefined && req.query.page!=0)?parseInt(req.query.page):default_page;
    let limit = (req.query.limit!=undefined && req.query.limit!=0)?parseInt(req.query.limit):default_limit;
    let sort = (req.query.sort!=undefined)?req.query.sort:default_sort;
    let ascending = (req.query.ascending!=undefined)?(req.query.ascending=='true'):default_ascending;
    let categoryId = req.params.categoryId;

    let startValue = (page>0)?((page*limit)-limit):0;

    var client = new DbClient();

    var productionList = prodcutService.getProductListByCategory(dbUri,dbName,product_collection_name,category_collection_name,categoryId,client,sort,ascending,startValue,limit);

    productionList.then(function(result)
    {
        res.send(result);
    });
})

module.exports = router;