import { fs } from 'fs/promises';
import { zlib  } from 'zlib';

export const compressFile = (pathToFile, pathToDestination) => {
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(pathToDestination);
    const brotliStream = zlib.createBrotliCompress();
    
    readStream.pipe(brotliStream).pipe(writeStream);
    
    readStream.on('error', (err) => {
        console.error('Compress operation failede:', err);
    });
    
    writeStream.on('finish', () => {
      console.log(`File compressed successfully: ${pathToDestination}`);
    });
    
    writeStream.on('error', (err) => {
        console.error('Compress operation failed:', err);
      });
}

