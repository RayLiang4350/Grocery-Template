const categoryService = require('../entities_service/Category');
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
    var client = new DbClient();
    var categoryList = categoryService.getAllCategoryInfo(dbUri,dbName,category_collection_name,client);
    categoryList.then(function(result){
        res.send(result);
    })
})


module.exports = router;
