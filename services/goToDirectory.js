import path,{ dirname }  from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const goToDirectory = (directory) => {
    // console.log(__dirname);
    // console.log(path.join(__dirname, '..'))
    // not done
    console.log(process.cwd());
    // const newPath = path.join(__dirname, '..');  -- up
    try {
        const newPath = path.join(__dirname, directory);
        process.chdir(newPath);
        console.log('Changed to Dedicated Folder:', process.cwd());
    } catch(error) {
        console.error(error);
    }
  
} 