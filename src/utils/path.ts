import { join } from 'path';

function getPublic() {
    const currentDirectory = process.cwd();
    return join(currentDirectory, 'public');
}

export default getPublic;