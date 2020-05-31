#!/usr/bin/env node

const yargs = require('yargs')
const path = require('path')
const fs = require('fs')
var datetime = require('node-datetime')

const options = yargs
    .usage("Usage: --fileType <fileType> --directory <absolute-path-to-files>")
    .option("f", {alias: "fileType", describe: "type of files to rename", type: "string", demandOption: true})
    .option("d", {alias: "directory", describe: "absolute path to files being renamed", type: "string", demandOption: false})
    .argv

const processFile = (filePath, fileName, fileType) => {
    console.log(`Proceessing ${fileName}`)

    // if filename matches our expected date pattern,
    // then convert date pattern back into a date-time and use this to set the file's timestamp.
    if (fileName.match(/\d+-\d+-\d+ \d+_\d+_\d+/g)) {
        const numbers = fileName.match(/\d+/g).map(String);
        const dt = datetime.create(`${numbers[0]}-${numbers[1]}-${numbers[2]} ${numbers[3]}:${numbers[4]}:${numbers[5]}`);

        // set timestamps on file
        const fullFilePath = `${filePath}/${fileName}`
        fs.utimesSync(fullFilePath, dt.epoch(), dt.epoch());
    } else {
        console.log(`WARNING: file ${fileName} does not have the expected format of 'YYYY-MM-DD HH_MM_SS'. Unable to compute and set timestamp.`)
    }
}

//
// Script Start
//

// file type to be renamed
if (!options.fileType) {
    console.log("Error: No fileType parameter has been supplied. For example, use --fileType=txt")
    process.exit(1);
}
const fileType = options.fileType

// use provided directory path or default to files sub-directory
const directoryPath = options.directory ? options.directory : path.join(__dirname, 'files')
console.log(`Scanning directory '${directoryPath}'`)

// find files and iteratively update them
try{
    const files = fs.readdirSync(directoryPath)
        .filter(file => file.endsWith(`.${fileType}`))
    
    if (files.length > 0) {
        console.log(`Found ${files.length} matching file/s with file type: ${fileType}`)
        files.forEach(file => processFile(directoryPath, file, fileType))
        console.log(`File updates completed.`)
    } else {
        console.log(`No matching files found with file type: ${fileType}`)
    }
}
catch(error) {
    console.log(`Error when attempting to update files in directory ${directoryPath}`)
    console.log(`Details: ${error}`)
}
