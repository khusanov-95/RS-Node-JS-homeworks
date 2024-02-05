import {fs } from 'fs/promises';

export const copyFile = async (pathToFile, pathToNewDirectory) => {
const readStream = fs.createReadStream(pathToFile);
const writeStream = fs.createWriteStream(pathToNewDirectory);

readStream.on('error', (err) => {
  console.error('FS operation failede:', err);
});

writeStream.on('error', (err) => {
  console.error('FS operation failed:', err);
});

writeStream.on('finish', () => {
  console.log('File renamed successfully.');
});

readStream.pipe(writeStream);

readStream.on('end', () => {
    fs.unlink(currentFilePath, (err) => {
      if (err) {
        console.error('Error deleting original file:', err);
      }
    });
});
};