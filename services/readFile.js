import { createReadStream } from 'fs';
import { stdout } from 'process';

export const readFile = async (fileToRead) => {
    const readStream =  createReadStream(fileToRead, 'utf-8')
    readStream.on('data', function(chunk) {
        stdout.write(chunk)
    })
    readStream.on('error', (error) => {
        console.error('Operation failed', error);
    });
};