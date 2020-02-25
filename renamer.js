#!/usr/bin/env node

const args = require('yargs').argv
const path = require('path')
const fs = require('fs')
var datetime = require('node-datetime')

const processFile = (filePath, fileName, fileType) => {
    const utcTime = extractTimestamp(`${filePath}/${fileName}`)
    const formattedTime = convertTimestamp(utcTime)
    const formattedFileName = `${formattedTime}.${fileType}`
    console.log(`Renaming file ${fileName} to ${formattedFileName}`)
    renameFile(filePath, fileName, formattedFileName)
}

const renameFile = (filePath, oldFileName, newFileName) => {
    const oldFilePath = `${filePath}/${oldFileName}`
    const newFilePath = `${filePath}/${newFileName}`
    if (fs.existsSync(newFilePath)) {
        console.log(`WARNING: file ${newFileName} already exists. File renamed aborted. The original file ${oldFileName} has not been renamed.`)
    } else {
        fs.renameSync(oldFilePath, newFilePath)
    }
}

// extract timestamp from file in provided filepath
const extractTimestamp = (filePath) => {
    const stats = fs.statSync(filePath)
    return stats.mtime
}

// convert file timestamp into wanted filename format
// see: https://www.npmjs.com/package/node-datetime
const convertTimestamp = (utcTime) => {
    const dt = datetime.create(utcTime)
    return dt.format('Y_m_d-H_M_S')
}


//
// Script Start
//

// file type to be renamed
if (!args.fileType) {
    console.log("Error: No fileType parameter has been supplied. For example, to rename text files, use --fileType=txt")
    process.exit(1);
}
const fileType = args.fileType

// use provided directory path or default to target sub-directory
const directoryPath = args.directory ? args.directory : path.join(__dirname, 'target')
console.log(`Scanning directory '${directoryPath}'`)

// find files and iteratively rename them
try{
    const files = fs.readdirSync(directoryPath)
        .filter(file => file.endsWith(`.${fileType}`))
    
    if (files.length > 0) {
        console.log(`Found ${files.length} matching file/s with file type: ${fileType}`)
        files.forEach(file => processFile(directoryPath, file, fileType))
        console.log(`File renaming completed.`)
    } else {
        console.log(`No matching files found with file type: ${fileType}`)
    }
}
catch(error) {
    console.log(`Error when attempting to rename files in directory ${directoryPath}`)
    console.log(`Details: ${error}`)
}
