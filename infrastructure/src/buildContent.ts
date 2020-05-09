import fs from 'fs';
import {resolve} from 'path';
import getFiles from 'fs-readdir-recursive';

import {AppPath} from './enums';
import {infraDir} from './constants';

const content = resolve(infraDir, AppPath.CONTENT);
const compiledContent = resolve(infraDir, AppPath.COMPILED_CONTENT);

/**
 * Генерируем объект с контентом
 */
function generateDataObject() {
    const files = getFiles(content)
    const data = {};

    files.forEach(file => {
        const name = file.split('.').shift();
        data[name] = fs.readFileSync(resolve(content, file), 'utf-8');
    })

    return data;
}

/**
 * Записываем данные в compiledContent
 */
function writeContent() {
    const filePath = resolve(infraDir, AppPath.CONTENT_FILE);

    const content = JSON.stringify(generateDataObject());
    const prefix = 'export const content = ';
    const fileData = prefix.concat(content);

    fs.writeFile(filePath, fileData, error => {
        if (error) {
            throw error;
        }

        console.log('Контент успешно записан!');
    });
}

export default function() {
    writeContent()
}
