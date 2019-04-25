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
