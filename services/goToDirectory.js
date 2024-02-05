import path from 'path';



export const goToDirectory = (directory) => {
    const currentDirectory = process.cwd();
    const parentDirectory = path.join(currentDirectory, '..');
    const isRootDirectory = currentDirectory === parentDirectory;
    if(isRootDirectory) {
        return;
    }
    if(directory) {
        console.log(path.isAbsolute(directory), directory)
        try {
            if(!path.isAbsolute(directory)) {
                const absolutePathToDirectory = path.resolve(currentDirectory, directory);
                console.log(absolutePathToDirectory)
                process.chdir(absolutePathToDirectory);
            } else {
                process.chdir(directory);
            }
        } catch(error) {
            console.error('Operation failed', error);
        }
    } else {
        try {
            process.chdir(path.join(currentDirectory, '..'));
        } catch(error) {
            console.error('Operation failed', error);
        }
    }
} 