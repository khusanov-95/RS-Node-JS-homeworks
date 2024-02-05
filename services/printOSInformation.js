import os from 'os'

export const printOSInformation = (command) => {
    try {
        if(command.includes('--EOL')) {
            console.log(`default system End-Of-Line ${JSON.stringify(os.EOL)}`)
        }
    
        else if(command.includes('--cpus')) {
            const cpus = os.cpus();
    
            console.log(`Total CPUs: ${cpus.length}`);
    
            cpus.forEach((cpu, index) => {
            const model = cpu.model;
            const speedGHz = (cpu.speed / 1000).toFixed(2);
    
            console.log(`CPU ${index + 1}, Model: ${model}, Clock Rate: ${speedGHz} GHz`);
            });
        } 
    
        else if(command.includes('--homedir')) {
            console.log(`Home Directory: ${os.homedir()}`);
        }
    
        else if(command.includes('--username')) {
            console.log(`Current System User Name: ${os.userInfo().username}`);
        }
    
        else if(command.includes('--architecture')) {
            console.log(`Node.js Binary Compiled for CPU Architecture: ${ os.arch()}`);
        } else {
            console.log('Invalid input')
        }
    } catch(error) {
        console.error('Operation failed', error);
    }

     
}