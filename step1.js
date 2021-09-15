const fs = require("fs");
const process = require("process");

const path = process.argv[2];

function cat(path) {
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

cat(path);