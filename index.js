
import {welcomeUser} from './services/welcomeUser.js';
import { getCurrentPath } from './services/getCurrentPath.js';
import { goToDirectory } from './services/goToDirectory.js';
import { readFile } from './services/readFile.js';
import { createFile } from './services/createFile.js';

welcomeUser();
// getCurrentPath()


import { createWriteStream } from "fs";
import { stdin } from 'process';

const write = async () => {
    // const fileToWrite = 'src/streams/files/fileToWrite.txt';
    // const writeStream = createWriteStream(fileToWrite, 'utf-8');
    
    stdin.on("data", function(data) {
        // writeStream.write(data);
        const command = data.toString();
        if(command.includes('up')) {
            goToDirectory()
        }
        if(command.includes('cd')) {
            goToDirectory(command.split(' ')[1])
        }
        if(command.includes('ls')) {
   
        }
        if(command.includes('cat ')) {
            readFile(command.split(' ')[1])
        }
        if(command.includes('add')) {
            createFile(command.split(' ')[1])
        }
        if(command.includes('rn')) {
    
        }
        if(command.includes('cp')) {
    
        }
        if(command.includes('mv ')) {
    
        }
        if(command.includes('ls')) {
    
        }
        if(command.includes('rm')) {

        }
        if(command.includes('os')) {

        }
        if(command.includes('hash')) {

        }
        if(command.includes('compress')) {

        }
        if(command.includes('decompress')) {

        }
    })
};

await write();