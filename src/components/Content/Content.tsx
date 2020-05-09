import React, { FunctionComponent } from 'react';
import cn from 'classnames/bind';
import get from 'lodash/get';
import JsxParser from 'react-jsx-parser';
import MarkdownIt from 'markdown-it';

import { content } from 'src/compiledContent/content';

import { Typography, Paper } from '@material-ui/core';

import { ContentProps } from './Content.types';

import * as styles from './Content.pcss';

const cx = cn.bind(styles);

export const Content: FunctionComponent<ContentProps> = props => {
    const { path } = props;
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
    });

    const decodedURI = decodeURI(path);
    const selectedContent = get(content, [decodedURI]) || '';
    const parsedContent = md.render(selectedContent);

    const rootClassName = cx('root');

    return (
        <div className={rootClassName}>
            {<JsxParser components={{ Typography, Paper }} jsx={parsedContent} />}
        </div>
    );
};

export default Content;
