const collectionService = require('../entities_service/Category');
const express = require('express');
const router = express.Router();
var DbClient = require('../dbManager');
const fs = require("fs");
const appSettings = JSON.parse(fs.readFileSync("./Src-back/appSettings.json"));

router.get('/',function(req,res){
    let page = (req.query.page!=undefined && req.query.page!=0)?req.query.page:1;
    let limit = (req.query.page!=undefined && req.query.page!=0)?req.query.page:appSettings.customer.page_display_limit;

    let startValue;
    let endValue;

    if(page>0)
    {
        startValue = (page*limit)-limit;
        endValue = page*limit;
    }
    else
    {
        startValue = 0;
        endValue = limit;
    }

    var client = new DbClient();

})