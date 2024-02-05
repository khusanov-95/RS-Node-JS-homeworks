import { writeFile, readFile } from 'fs/promises';

export const createFile = async (fileName) => {
    const file = `${process.cwd()}/${fileName}`
    try {
        await readFile(file);
        console.error('FS operation failed')
    }  catch (error) {
        await writeFile(file);
    }
};