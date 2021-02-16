const fs = require("fs")
const path = require("path")

const copyRecursiveSync = function (src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(path.join(src, childItemName),
                path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};

const src = './dist/tinkoff-front'
const extDir = '../www/html'
fs.rmdirSync(extDir, { recursive: true });
const dest = '../www/html';
copyRecursiveSync(src, dest)
