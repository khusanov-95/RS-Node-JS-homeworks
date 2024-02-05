import fs from 'fs';
import zlib from 'zlib';

export const decompressFile = (pathToFile, pathToDestination) => {
    try {
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(pathToDestination);
    const brotliStream = zlib.createBrotliDecompress();
    readStream.pipe(brotliStream).pipe(writeStream);

    readStream.pipe(brotliStream).pipe(writeStream);
            
    readStream.on('error', (error) => {
        console.error('Operation failed', error);
    });
    
    writeStream.on('error', (error) => {
        console.error('Operation failed', error);
        });
    } catch(error) {
        console.error('Operation failed', error);
    }

}

