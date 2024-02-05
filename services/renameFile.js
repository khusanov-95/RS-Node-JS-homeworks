import {rename, readFile } from 'fs/promises';

export const renameFile = async (pathToFile, newFileName) => {

    let alreadyRenamed;

    try {
        alreadyRenamed = await readFile(newFileName);
    } catch (e) {}

    try {
        if(alreadyRenamed) {
            throw error;
        }      
        await readFile(pathToFile);
        await rename(pathToFile, newFileName);
    } catch(error) {
        console.error('FS operation failed');
    }
};