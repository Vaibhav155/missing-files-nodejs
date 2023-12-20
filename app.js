const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const express = require('express');
const app = express();

async function checkFiles(csvFilePath, folderPath){
    try{
        const csvData = await fs.promises.readFile(csvFilePath, 'utf-8');
        const fileNames = csvData.split('\n').map(line => line.trim());
        for(const fileName of fileNames){
            const filePath = path.join(folderPath, fileName);
            try{
                await fs.promises.access(filePath, fs.constants.F_OK);
            }catch(error){
                console.log(`File not found: ${fileName}`);
            }
        }
        console.log('File check completed.');
    }catch(error){
        console.error('error', error);
    }
}

const csvFilePath = path.join(__dirname, 'Greenland Ruby Gems.csv');
const folderPath = path.join(__dirname, 'certificatePdf');
checkFiles(csvFilePath, folderPath);