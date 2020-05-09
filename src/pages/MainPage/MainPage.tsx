import React, { FunctionComponent, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import { useParams } from 'react-router';

import { mainConfig } from 'src/config/mainConfig';
import { MainMenu, ArticlesMenu, Content } from 'src/components';

import { MainPageProps } from './MainPage.types';

import * as styles from './MainPage.pcss';

const cx = cn.bind(styles);

const { defaultArticle } = mainConfig;

export const MainPage: FunctionComponent<MainPageProps> = props => {
    const { section, article } = useParams();

    const mainMenuProps = { selectedElement: section };
    const articlesMenuProps = {
        section,
        selectedElement: article,
    };
    const contentProps = {
        path: article ? `${section}/${article}` : section || defaultArticle,
    };

    const rootClassNames = cx('root');

    return (
        <div className={rootClassNames}>
            <MainMenu {...mainMenuProps} />
            {section && <ArticlesMenu {...articlesMenuProps} />}
            <Content {...contentProps} />
        </div>
    );
};

export default MainPage;
