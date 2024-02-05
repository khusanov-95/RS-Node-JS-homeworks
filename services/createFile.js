import { writeFile, readFile } from 'fs/promises';

export const createFile = async (fileName) => {
    try {
        const file = `${process.cwd()}\\${fileName}`;
        await writeFile(file, "");
    }  catch (error) {
        console.error('Operation failed', error);
    }
};