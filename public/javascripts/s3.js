
window.onload = function() {


    this.console.log("js loaded")

     var getbutton = document.getElementById('getbutton1') || "nullObj";
     getbutton.onclick= function(){
         getfile1();
     }
     function getfile1(){
         var bucketname = document.getElementById('bucketnametoget').value;
         var filename = document.getElementById('filenametoget').value;

         alert("Getting file")
         window.location = `/s3/getobject/${bucketname}/${filename}`;
     }






}
