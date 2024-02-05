import { unlink, readFile } from 'fs/promises';

export const remove = async (fileToRemove) => {
    try {
        await readFile(fileToRemove)
        await unlink(fileToRemove);
    } catch(error) {
        console.error('FS operation failed:', error)
    }
};

await remove();