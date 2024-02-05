import { createReadStream } from 'fs';
import { stdout } from 'process';

export const read = async (fileToRead) => {
    const readStream = createReadStream(fileToRead, 'utf-8')
    readStream.on('data', function(chunk) {
        stdout.write(chunk)
    })
};