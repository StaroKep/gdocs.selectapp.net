import { mainConfig } from 'src/config/mainConfig';

export enum Path {
    HOME = '/',
}

export enum RouterPath {
    HOME = '/:section?/:article?',
}

export function getPath(path: Path | RouterPath) {
    return `${mainConfig.baseURI}${path}`;
}
