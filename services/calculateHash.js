import { createHash } from "crypto";
import { readFile } from 'fs/promises';

export const calculateHash = async (fileToRead) => {
    const content = await readFile(fileToRead, { encoding: 'utf8' });
    const hash = createHash('sha256').update(content).digest('hex');
    console.log(hash)
};