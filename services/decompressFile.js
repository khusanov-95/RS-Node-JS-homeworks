import fs from 'fs';
import zlib from 'zlib';

export const decompressFile = async (pathToFile, pathToDestination) => {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(pathToFile);
        const writeStream = fs.createWriteStream(pathToDestination);
        const brotliStream = zlib.createBrotliDecompress();
    
        readStream.on('error', reject);
        writeStream.on('error', reject);
        brotliStream.on('error', reject);
        writeStream.on('finish', () => {
          resolve();
        });
    
        readStream.pipe(brotliStream).pipe(writeStream);
      });
}

