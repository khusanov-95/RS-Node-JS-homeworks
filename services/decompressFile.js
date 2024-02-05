import { fs } from 'fs/promises';
import { zlib  } from 'zlib';

export const compressFile = (pathToFile, pathToDestination) => {
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(pathToDestination);
    const brotliStream = zlib.createBrotliDecompress();
    
    readStream.pipe(brotliStream).pipe(writeStream);
    
    readStream.on('error', (err) => {
        console.error('Decompress operation failede:', err);
    });
    
    writeStream.on('finish', () => {
      console.log(`File decompressed  successfully: ${pathToDestination}`);
    });
    
    writeStream.on('error', (err) => {
        console.error('Decompress operation failed:', err);
      });
}
