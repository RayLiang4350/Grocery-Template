const express = require("express");
var router = express.Router();
const path = require('path');


// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
router.get("/:folderName/:fileName", (req,res)=>{
    let folderName = req.params.folderName;
    let fileName = req.params.fileName;
    res.sendFile(path.join(__dirname,'../picture/'+folderName+'/'+fileName));
});

module.exports = router;