import {rename, readFile } from 'fs/promises';

export const renameFile = async (pathToFile, newFileName) => {

    const path = `${process.cwd()}\\${pathToFile}`;
    const newPath = `${process.cwd()}\\${newFileName}`;
    console.log(path, 1, newPath, 2)

    try {
        const path = `${process.cwd()}\\${pathToFile}`;
        const newPath = `${process.cwd()}\\${newFileName}`
        console.log(path)
    
        await readFile(path);
        await rename(path, newPath);
    } catch(error) {
        console.error('Operation failed', error);
    }
};