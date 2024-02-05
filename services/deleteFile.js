import { unlink, readFile } from 'fs/promises';

export const deleteFile = async (fileToRemove) => {
    try {
        await readFile(fileToRemove)
        await unlink(fileToRemove);
    } catch(error) {
        console.error('Operation failed', error);
    }
};