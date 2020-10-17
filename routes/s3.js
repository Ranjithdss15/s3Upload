var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('s3_home', { title: 'S3 file manager'});
});


AWS.config.getCredentials(function(err) {
    if (err) console.log(`AWS login error: ${err.stack}`);
    // credentials not loaded
    else {
        console.log("Connected to AWS")
        
      // console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
  });
var s3 = new AWS.S3();

router.post('/uploadtest',function(req,res,next){
    // let filename = req.body.filename
    let bucketname = req.body.bucketname
    res.send(bucketname);
});

router.get('/getobject/:bucketname/:object',function(req,res,next){
  // let filename = req.body.filename
  let bucketname = req.params.bucketname
  let object = req.params.object
  ;(async () => {
    var params = {
      Bucket: bucketname, 
      Key: object
     };
        console.log("Getting file from S3")
        s3.getObject(params, function(err, data) {
          if (err) {
            console.log(err, err.stack);
            res.render('s3_home',{title:'Error Occured',content1:'Your file cannot be downloaded.',logs:err})
          } // an error occurred
          else    {
            console.log(data);  
            res.attachment(object);
            // res.send(data.Body);
            res.render('s3_home',{title:'Downloading..',content1:'Your file will be downloaded.'})
          }    

        });
    
})()
});


  router.post('/upload',function(req,res,next){
    // let filename = req.body.filename
    let bucketname = req.body.bucketname

    // if(req.files && filename){
    if(req.files && bucketname){
        let file = req.files.filetoupload;
        let filename = file.name
        ;(async () => {
            var params = {Body: file.data, Bucket: bucketname, Key: filename};

                console.log("Uploading file to S3")
                s3.putObject(params, function(err, data) {
                    if (err) {
                        console.log(err, err.stack);
                        res.render('s3_home',{title:'File Not Uploaded!',content1:'Your file has not been uploaded.',logs:err })
                        return false
                    }
                    else { 
                        console.log(data);
                        console.log("Uploaded file to S3")
                        res.render('s3_home',{title:'File Uploaded!',content1:'Your file has been successfully uploaded'})                        
                        return true
                      }        
                });
            
        })()
    }
    else{
        res.render('s3_home',{title:'File or file name is not valid',content1:'Please upload the file and enter the Song Name and try again',userValid:true})
        console.log("File not found")
    }
})

router.get('/upload',function(req,res,next){
  res.redirect("/s3");
});

module.exports = router;
