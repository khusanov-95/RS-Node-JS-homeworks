import {argv} from 'node:process'

export const welcomeUser = () => {
    const user = argv.find(value => value.includes("--username"));
    const userName = user.split('=')[1];
    const formattedName = userName[0].toUpperCase() + userName.substring(1)
    console.log(`Welcome to the File Manager, ${formattedName}!`);


    process.on('exit', () => { // not working
        console.log(`Thank you for using File Manager, ${formattedName}, goodbye!`);
    });
};