/*// Import the filesystem module
const fs = require("fs");
  
let directory_name = "D:/MyScripts/js-basics";
  
// Function to get current filenames
// in directory
let filenames = fs.readdirSync(directory_name);
  
console.log("\nFilenames in directory:");
filenames.forEach((file) => {
    console.log("File:", file);
});*/


/*// Import the filesystem module
const fs = require("fs");
  
let directory_name = "D:/MyScripts/js-basics";
  
// Open the directory
let openedDir = fs.opendirSync(directory_name);
  
// Print the pathname of the directory
console.log("\nPath of the directory:", openedDir.path);
  
// Get the files present in the directory
console.log("Files Present in directory:");
  
let filesLeft = true;
while (filesLeft) {
  // Read a file as fs.Dirent object
  let fileDirent = openedDir.readSync();
  
  // If readSync() does not return null
  // print its filename
  if (fileDirent != null) {
    console.log("Name:", fileDirent.name);
  }
  
  // If the readSync() returns null
  // stop the loop
  else filesLeft = false;
}*/

///////////////////////////////////////////////////////////////////
/*const fs = require('fs')
const path = require('path')
const { SHA3 } = require("sha3")
const rstream = f => new Promise( (resolve, reject) => {
    const readStream = fs.createReadStream(f, {highWaterMark: 1024*1024 });
    
    const data = []
    readStream.on('data', (chunk) => {
        data.push(chunk)
    })
 
    readStream.on('end', () => {
        resolve(data)
    })
    
    readStream.on('error', (err) => {
        reject(err)
    })
})
 
const getHash = (entry, data) => {
    const hash = new SHA3(256);
    hash.update(Buffer.concat(data))
    console.log(entry, hash.digest('hex'))
}
 
const procEntry = async entry => {
    let statEntry = fs.statSync(entry)
    if (statEntry.isFile()) {
        try {
            let data = await rstream(entry)
            getHash(entry, data)
        }
        catch (e) {
            console.log(e)
        }
        
    }
    else if (statEntry.isDirectory()){
        console.log(entry)
        for (let e of fs.readdirSync(entry)) {
            if (!ignore.includes(e))
                procEntry(path.join(entry, "\\", e))
        }
    }
}
 
try {
    for (let entry of fs.readdirSync(".")) if(!ignore.includes(entry)) procEntry(entry)
}
catch (e) {
    console.error(e.message)
}*/

/*let filesLeft = true;
while (filesLeft) {
  let file = openedDir.readSync();
  
  if (file != null) {
    console.log("Name: ", file.name);
  }
  
  // If the readSync() returns null
  // stop the loop
  else filesLeft = false;
}*/

/*try {
    var data = fs.readFileSync(".", {encoding: "utf-8"});
} catch(e) {
    console.error(e);
}*/

/*const hash = new SHA3(256)
const data = "abc", entry = "test"
//hash.update(Buffer.concat(data))
console.log(entry, data)//hash.digest('hex'))*/

const fs = require('fs')
const path = require('path')
const crypto = require("crypto")
const ignore = ["node_modules"]

function walkSync(dirPath, callback) {
    fs.readdirSync(dirPath).forEach(function (name) {
        var filePath = path.join(dirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

const rstream = fileName => new Promise((resolve, reject) => {
    let stream = fs.createReadStream(fileName);
    const data = []
    //let hash = crypto.createHash("sha256");
    stream.on("error", err => reject(err));
    stream.on("data", chunk => data.push(chunk));//hash.update(chunk));
    stream.on("end", () => resolve(data));//resolve(hash.digest("hex")));
});

walkSync('.', function(filePath) {
    let sha256 = await rstream(filePath)
    if (!filePath.includes(ignore)) console.log(filePath, sha256)
    //console.log(filePath, sha);
    /*let stream = new fs.ReadStream(filePath, {encoding: 'utf-8'});
    let dataStr = "";
    stream.on('readable', function() {
        dataStr.concat(stream.read());
    })
    stream.on('close', function() {
        var sha256 = crypto.createHash('sha256').update(dataStr).digest('hex')
        if (!filePath.includes(ignore)) console.log(filePath, sha256)
    })
    stream.on('error', function(err) {
        console.log(err);
    })*/
});