const fs = require("fs");
const process = require("process");
const axios = require("axios");

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

async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

function catWrite(file, path) {
    fs.writeFile(path, file, "utf8", function (err) {
        if (err) {
            console.log(`Couldn't write to ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(file);
        }
    });
}

let path;
let file;

if (process.argv[2] === "--out") {
    file = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
    webCat(path);
} else if (process.argv[2] === "--out") {
    catWrite(file, path);
} else {
    cat(path);
}