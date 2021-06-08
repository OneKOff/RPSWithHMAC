const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

let filenames = fs.readdirSync(".");
filenames.forEach((file) => {
    filePath = path.join(".", file);
    data = fs.readFileSync(filePath);
    sha256 = crypto.createHash('sha3-256').update(data.toString()).digest('hex')
    console.log(file, sha256);
});