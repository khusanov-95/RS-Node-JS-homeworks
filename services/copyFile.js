import fs from 'fs';

export const copyFile = async (pathToFile, pathToNewDirectory) => {
const readStream = fs.createReadStream(`${process.cwd()}\\${pathToFile}`);
const writeStream = fs.createWriteStream(`${process.cwd()}\\${pathToNewDirectory}`);

readStream.on('error', (error) => {
    console.error('Operation failed', error);
});

writeStream.on('error', (error) => {
    console.error('Operation failed', error);
});

readStream.pipe(writeStream);
};


