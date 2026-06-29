const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, 'www');

// Folders and files to copy
const assetsToCopy = [
    'index.html',
    'manifest.json',
    'sw.js',
    'css',
    'js',
    'assets'
];

function deleteFolderRecursive(directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file) => {
            const curPath = path.join(directoryPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(directoryPath);
    }
}

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

console.log('🧹 Cleaning www folder...');
deleteFolderRecursive(BUILD_DIR);

console.log('📁 Creating www folder...');
fs.mkdirSync(BUILD_DIR);

console.log('🚀 Copying web assets to www...');
assetsToCopy.forEach(asset => {
    const srcPath = path.join(__dirname, asset);
    const destPath = path.join(BUILD_DIR, asset);
    if (fs.existsSync(srcPath)) {
        console.log(` - Copying ${asset}`);
        copyRecursiveSync(srcPath, destPath);
    } else {
        console.warn(` ⚠️ Warning: ${asset} does not exist`);
    }
});

console.log('✅ Build complete! Web assets are in the www folder.');
