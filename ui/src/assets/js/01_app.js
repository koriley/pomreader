'use strict';
let fs = require("fs");

let diffMatchPatch = require('diff-match-patch-node');

var compf1 = "";
var compf2 = "";
var p1 = "";
var p2="";
var obj1={};
var obj2 = {};

jQuery("input[type='file']").on("change", function () {
  var path = jQuery(this)[0].files[0].path;
  var sendTo = jQuery(this).attr("data-to");
  console.log(path);
  readAFile(path).then((data) => {


    jQuery("." + sendTo).text(data);
    if (sendTo === "f1") {
      compf1 = data;
      p1=path;
    } else {
      compf2 = data;
      p2=path;
    }
  });
});

jQuery(".compare").on("click", async () => {
  if ((compf1 != "") && (compf2 != "")) {
   var diff = await diffMatchPatch().diff_main(compf1,compf2);
  await newPom(diff).then((data)=>{
    if(data != ''){
      jQuery(".sub").text(data.sub);
      jQuery(".add").text(data.add)
      jQuery(".popup").css({display:"flex"});
    }
    else{
      alert("Something happened, please try again.");
    }
  })
  } else {
    alert("Please select both POM files.");
  }
})

function newPom(pomArray){
  return new Promise((resolve, reject)=>{
    try{
      var add = "";
      var sub = "";
      var obj = {};

  for(var i=0;i<=pomArray.length-1;i++){
   
    if(pomArray[i][0] == 1){
      add += pomArray[i][1];
    }
    if(pomArray[i][0] == -1){
      sub += pomArray[i][1];
    }
    if(i>= pomArray.length-1){
      obj={"add":add, "sub":sub}
      resolve(obj);
    }
  }
    }catch (error){
      reject(error);
    }
  })
  
}

jQuery(".doClose").on("click", function(){
  jQuery(".popup").hide();
  jQuery(".sub").text("");
  jQuery(".add").text("");
})