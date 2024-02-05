import path,{ dirname }  from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const goToDirectory = (directory) => {
    const currentDirectory = process.cwd();
    if(directory) {
        try {
            const newPath = path.join(__dirname, directory);
            process.chdir(newPath);
            console.log('Changed to Dedicated Folder:', currentDirectory);
        } catch(error) {
            console.error(error);
        }
    } else {
        process.chdir(path.join(currentDirectory, '..'));
    }
} 