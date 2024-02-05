
import { stdin } from 'process';
import { welcomeUser } from './services/welcomeUser.js';
import { goToDirectory } from './services/goToDirectory.js';
import { readFile } from './services/readFile.js';
import { createFile } from './services/createFile.js';
import { printList } from './services/printList.js';
import { renameFile } from './services/renameFile.js';
import { moveFile } from './services/moveFile.js';
import { deleteFile } from './services/deleteFile.js';
import { copyFile } from './services/copyFile.js';
import { printOSInformation } from './services/printOSInformation.js';
import { calculateHash } from './services/calculateHash.js';
import { compressFile } from './services/compressFile.js';
import { decompressFile } from './services/decompressFile.js';

welcomeUser();

const prinCurrentDirectoryMessage = (directory) => console.log(`You are currently in ${directory}`)

const app = async () => {
    prinCurrentDirectoryMessage(process.cwd())

    stdin.on("data", async function(data) {
   
        const command = data.toString('utf8').trim();
        const script = command.split(' ')[0];


        if(script.includes('.exit')) {
            process.exit();
        }

        else if(script.includes('up')) {
            goToDirectory()
        }
        else if(script.includes('cd')) {
            goToDirectory(command.split(' ')[1])
        }
        else if(script.includes('ls')) {
            printList();
        }
        else if(script.includes('cat')) {
            readFile(command.split(' ')[1])
        }
        else if(script.includes('add')) {
            createFile(command.split(' ')[1])
        }
        else if(script.includes('rn')) {
            renameFile(command.split(' ')[1], command.split(' ')[2])
        }
        else if(script.includes('cp')) {
            copyFile(command.split(' ')[1], command.split(' ')[2])
        }
        else if(script.includes('mv')) {
            moveFile(command.split(' ')[1], command.split(' ')[2])
        }
        else if(script.includes('rm')) {
            deleteFile(command.split(' ')[1])
        }
        else if(script.includes('os')) {
            printOSInformation(command.split(' ')[1])
        }
        else if(script.includes('hash')) {
            calculateHash(command.split(' ')[1])
        }
        else if(script.includes('compress')) {
            try {
                await compressFile(command.split(' ')[1], command.split(' ')[2])
              } catch (error) {
                console.error('Operation failed', error);
              }
        }
        else if(script.includes('decompress')) {
            try {
                await decompressFile(command.split(' ')[1], command.split(' ')[2])
              } catch (error) {
                console.error('Operation failed', error);
              }
           
        } else {
            console.log('Invalid input')
        }
        prinCurrentDirectoryMessage(process.cwd())
    })
};

await app();