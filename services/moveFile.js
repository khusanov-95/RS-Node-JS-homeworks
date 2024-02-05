import fs from 'fs';

export const moveFile = async (pathToFile, pathToNewDirectory) => {
const readStream = fs.createReadStream(pathToFile);
const writeStream = fs.createWriteStream(pathToNewDirectory);

readStream.on('error', (error) => {
    console.error('Operation failed', error);
});

writeStream.on('error', (error) => {
    console.error('Operation failed', error);
});


readStream.pipe(writeStream);

readStream.on('end', () => {
    fs.unlink(pathToFile, (err) => {
      if (err) {
        console.error('Error deleting original file:', err);
      }
    });
});
};