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
'use strict';

function readAFile(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf-8', function (err, data) {
            if (err) {
                reject("An error ocurred reading the file :" + err.message);
                return;
            } else {
                resolve(data);
            }
        });
    });
}

function writeFile(filepath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("File Written");
            }
        });
    })
}

function getDirContents(dir) {
    return new Promise((resolve, reject) => {
        var files = {};
        var fileNames = [];
        try {
            fs.readdirSync(dir).forEach(async (fileName) => {
               
                fileNames.push({
                    "name": fileName,

                })
                files = { "files": fileNames }

            });
            resolve(files);
        } catch (error) {
            reject(error);
        }

    })
}

function checkFileExist(path) {
    return new Promise((resolve, reject) => {
        if (!path) {
            reject("Path is invalid " + path)
        }
        try {
            fs.access(path, fs.F_OK, (err) => {
                if (err) {
                    resolve("false");
                }
                resolve("true");
            });
        } catch (error) {
            reject("error");
        }
    });
}

async function checkType(path){
    return new Promise(async (resolve, reject)=>{
        try{
           
            await fs.lstat(path, (err, stats) => {

                if(err){
                    reject(new Error(`${err}`));
                }
                   
                   if(stats.isFile()){
                       resolve("file");
                   }else if(stats.isDirectory()){
                    resolve("dir");
                   }else{
                       reject(new Error("File type unknown in scope"))
                   }
                
            
            });
        }catch(error){
            reject(new Error(`${error}`));
        }
    });
}

function checkDirExist(dir) {
    return new Promise((resolve, reject) => {
        try {
            if (fs.existsSync(dir)) {
                resolve("true");
            } else {
                resolve("false");
            }

        } catch (error) {
            reject(error);
        }
    });
}

function createDir(dir) {
    return new Promise((resolve, reject) => {
        try {
            fs.mkdirSync(dir);
            resolve("done");
        } catch (error) {
            reject(error);
        }
    });
}

function removeSpace(string) {
    return new Promise((resolve, reject) => {
        try {
            var cleanString = string.replace(/\s/g, spaceChar);
            resolve(cleanString);
        } catch (error) {
            reject(error);
        }
    })


}

function addSpace(string) {

    return new Promise((resolve, reject) => {
        try {
            var addSpace = new RegExp(spaceChar, "g")
            var cleanString = string.replace(addSpace, /\s/);
            resolve(cleanString);
        } catch (error) {
            reject(error);
        }
    })
}
//write test
// var testObj  = "This is a write test";
// writeFile("../test.txt", testObj);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAxX2FwcC5qcyIsIjAzX2lvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubGV0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuXG5sZXQgZGlmZk1hdGNoUGF0Y2ggPSByZXF1aXJlKCdkaWZmLW1hdGNoLXBhdGNoLW5vZGUnKTtcblxudmFyIGNvbXBmMSA9IFwiXCI7XG52YXIgY29tcGYyID0gXCJcIjtcbnZhciBwMSA9IFwiXCI7XG52YXIgcDI9XCJcIjtcbnZhciBvYmoxPXt9O1xudmFyIG9iajIgPSB7fTtcblxualF1ZXJ5KFwiaW5wdXRbdHlwZT0nZmlsZSddXCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBhdGggPSBqUXVlcnkodGhpcylbMF0uZmlsZXNbMF0ucGF0aDtcbiAgdmFyIHNlbmRUbyA9IGpRdWVyeSh0aGlzKS5hdHRyKFwiZGF0YS10b1wiKTtcbiAgY29uc29sZS5sb2cocGF0aCk7XG4gIHJlYWRBRmlsZShwYXRoKS50aGVuKChkYXRhKSA9PiB7XG5cblxuICAgIGpRdWVyeShcIi5cIiArIHNlbmRUbykudGV4dChkYXRhKTtcbiAgICBpZiAoc2VuZFRvID09PSBcImYxXCIpIHtcbiAgICAgIGNvbXBmMSA9IGRhdGE7XG4gICAgICBwMT1wYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wZjIgPSBkYXRhO1xuICAgICAgcDI9cGF0aDtcbiAgICB9XG4gIH0pO1xufSk7XG5cbmpRdWVyeShcIi5jb21wYXJlXCIpLm9uKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuICBpZiAoKGNvbXBmMSAhPSBcIlwiKSAmJiAoY29tcGYyICE9IFwiXCIpKSB7XG4gICB2YXIgZGlmZiA9IGF3YWl0IGRpZmZNYXRjaFBhdGNoKCkuZGlmZl9tYWluKGNvbXBmMSxjb21wZjIpO1xuICBhd2FpdCBuZXdQb20oZGlmZikudGhlbigoZGF0YSk9PntcbiAgICBpZihkYXRhICE9ICcnKXtcbiAgICAgIGpRdWVyeShcIi5zdWJcIikudGV4dChkYXRhLnN1Yik7XG4gICAgICBqUXVlcnkoXCIuYWRkXCIpLnRleHQoZGF0YS5hZGQpXG4gICAgICBqUXVlcnkoXCIucG9wdXBcIikuY3NzKHtkaXNwbGF5OlwiZmxleFwifSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBhbGVydChcIlNvbWV0aGluZyBoYXBwZW5lZCwgcGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgfVxuICB9KVxuICB9IGVsc2Uge1xuICAgIGFsZXJ0KFwiUGxlYXNlIHNlbGVjdCBib3RoIFBPTSBmaWxlcy5cIik7XG4gIH1cbn0pXG5cbmZ1bmN0aW9uIG5ld1BvbShwb21BcnJheSl7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgIHRyeXtcbiAgICAgIHZhciBhZGQgPSBcIlwiO1xuICAgICAgdmFyIHN1YiA9IFwiXCI7XG4gICAgICB2YXIgb2JqID0ge307XG5cbiAgZm9yKHZhciBpPTA7aTw9cG9tQXJyYXkubGVuZ3RoLTE7aSsrKXtcbiAgIFxuICAgIGlmKHBvbUFycmF5W2ldWzBdID09IDEpe1xuICAgICAgYWRkICs9IHBvbUFycmF5W2ldWzFdO1xuICAgIH1cbiAgICBpZihwb21BcnJheVtpXVswXSA9PSAtMSl7XG4gICAgICBzdWIgKz0gcG9tQXJyYXlbaV1bMV07XG4gICAgfVxuICAgIGlmKGk+PSBwb21BcnJheS5sZW5ndGgtMSl7XG4gICAgICBvYmo9e1wiYWRkXCI6YWRkLCBcInN1YlwiOnN1Yn1cbiAgICAgIHJlc29sdmUob2JqKTtcbiAgICB9XG4gIH1cbiAgICB9Y2F0Y2ggKGVycm9yKXtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgfVxuICB9KVxuICBcbn1cblxualF1ZXJ5KFwiLmRvQ2xvc2VcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICBqUXVlcnkoXCIucG9wdXBcIikuaGlkZSgpO1xuICBqUXVlcnkoXCIuc3ViXCIpLnRleHQoXCJcIik7XG4gIGpRdWVyeShcIi5hZGRcIikudGV4dChcIlwiKTtcbn0pIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiByZWFkQUZpbGUoZmlsZXBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmcy5yZWFkRmlsZShmaWxlcGF0aCwgJ3V0Zi04JywgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChcIkFuIGVycm9yIG9jdXJyZWQgcmVhZGluZyB0aGUgZmlsZSA6XCIgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gd3JpdGVGaWxlKGZpbGVwYXRoLCBkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZnMud3JpdGVGaWxlKGZpbGVwYXRoLCBkYXRhLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJGaWxlIFdyaXR0ZW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGdldERpckNvbnRlbnRzKGRpcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHZhciBmaWxlcyA9IHt9O1xuICAgICAgICB2YXIgZmlsZU5hbWVzID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmcy5yZWFkZGlyU3luYyhkaXIpLmZvckVhY2goYXN5bmMgKGZpbGVOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmaWxlTmFtZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBmaWxlTmFtZSxcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZmlsZXMgPSB7IFwiZmlsZXNcIjogZmlsZU5hbWVzIH1cblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXNvbHZlKGZpbGVzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cblxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGNoZWNrRmlsZUV4aXN0KHBhdGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgICAgIHJlamVjdChcIlBhdGggaXMgaW52YWxpZCBcIiArIHBhdGgpXG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZzLmFjY2VzcyhwYXRoLCBmcy5GX09LLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiZmFsc2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoXCJ0cnVlXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoXCJlcnJvclwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjaGVja1R5cGUocGF0aCl7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBhd2FpdCBmcy5sc3RhdChwYXRoLCAoZXJyLCBzdGF0cykgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgJHtlcnJ9YCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICBpZihzdGF0cy5pc0ZpbGUoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJmaWxlXCIpO1xuICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHN0YXRzLmlzRGlyZWN0b3J5KCkpe1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFwiZGlyXCIpO1xuICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiRmlsZSB0eXBlIHVua25vd24gaW4gc2NvcGVcIikpXG4gICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYCR7ZXJyb3J9YCkpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRGlyRXhpc3QoZGlyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGRpcikpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShcImZhbHNlXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURpcihkaXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZnMubWtkaXJTeW5jKGRpcik7XG4gICAgICAgICAgICByZXNvbHZlKFwiZG9uZVwiKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3BhY2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBjbGVhblN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXHMvZywgc3BhY2VDaGFyKTtcbiAgICAgICAgICAgIHJlc29sdmUoY2xlYW5TdHJpbmcpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pXG5cblxufVxuXG5mdW5jdGlvbiBhZGRTcGFjZShzdHJpbmcpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgYWRkU3BhY2UgPSBuZXcgUmVnRXhwKHNwYWNlQ2hhciwgXCJnXCIpXG4gICAgICAgICAgICB2YXIgY2xlYW5TdHJpbmcgPSBzdHJpbmcucmVwbGFjZShhZGRTcGFjZSwgL1xccy8pO1xuICAgICAgICAgICAgcmVzb2x2ZShjbGVhblN0cmluZyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSlcbn1cbi8vd3JpdGUgdGVzdFxuLy8gdmFyIHRlc3RPYmogID0gXCJUaGlzIGlzIGEgd3JpdGUgdGVzdFwiO1xuLy8gd3JpdGVGaWxlKFwiLi4vdGVzdC50eHRcIiwgdGVzdE9iaik7XG4iXX0=
