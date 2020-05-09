import fs from 'fs';
import { resolve } from 'path';
import { zipObjectDeep, merge } from 'lodash';
import getFiles from 'fs-readdir-recursive';

import { AppPath } from './enums';
import { infraDir } from './constants';

const content = resolve(infraDir, AppPath.CONTENT);

/**
 * Получаем иерархию фалов
 */
function getHierarchy() {
    const files: string[] = getFiles(content);
    console.log(infraDir);

    const parsedFiles = files.map(filePath => {
        filePath = filePath.replace('\\', '/');
        const fileExtension = filePath.split('.').pop();

        const fileWithoutExtension = filePath.split('.').shift() || '';
        const pathElements = fileWithoutExtension.split('/');

        const path = pathElements.join('.');
        return zipObjectDeep([path], [fileExtension]);
    });

    // @ts-ignore TODO: Разобраться с типами
    return merge(...parsedFiles);
}

/**
 * Записываем иерархию файлов в compiledContent
 */
function writeHierarchy() {
    const filePath = resolve(infraDir, AppPath.HIERARCHY_FILE);

    const hierarchy = JSON.stringify(getHierarchy());
    const prefix = 'export const hierarchy = ';
    const fileData = prefix.concat(hierarchy);

    fs.writeFile(filePath, fileData, error => {
        if (error) {
            throw error;
        }

        console.log('HIERARCHY :: SUCCESSFUL');
    });
}

export default function() {
    writeHierarchy();
}
