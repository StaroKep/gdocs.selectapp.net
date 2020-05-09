import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
// @ts-ignore
import JsxParser from 'react-jsx-parser';

import { mainConfig } from 'src/config/mainConfig';
import { hierarchy } from 'src/compiledContent/hierarchy';
import { content } from 'src/compiledContent/content';

import { Drawer, Typography, List, ListItem, ListItemText, Paper } from '@material-ui/core';

import { MainPageProps } from './MainPage.types';

import * as styles from './MainPage.pcss';

const cx = cn.bind(styles);

export const MainPage: FunctionComponent<MainPageProps> = () => {
    const { firstLvl, secondLvl } = useParams();
    const menuItems = Object.keys(hierarchy);
    const pathName = window.location.pathname.slice(1);

    const secondLvlMenuItems = firstLvl ? Object.keys(hierarchy[firstLvl]) : undefined;

    return (
        <div className={cx('root')}>
            <div className={cx('page-element')}>
                <Drawer
                    className={cx('drawer')}
                    classes={{
                        paper: cx('paper'),
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Typography
                        classes={{
                            root: cx('title'),
                        }}
                        variant="h5"
                        align="center"
                        noWrap
                    >
                        {mainConfig.appName}
                    </Typography>
                    <List>
                        {menuItems.map((text, index) => {
                            const isActive = firstLvl === text;

                            return (
                                <Link className={cx('link')} to={`/${text}`}>
                                    <ListItem button key={text} selected={isActive}>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                </Link>
                            );
                        })}
                    </List>
                </Drawer>
            </div>
            {firstLvl && secondLvlMenuItems && (
                <div className={cx('page-element')}>
                    <Drawer
                        className={cx('second-drawer')}
                        classes={{
                            paper: cx('second-paper'),
                        }}
                        variant="permanent"
                        anchor="left"
                    >
                        <List>
                            {secondLvlMenuItems.map((text, index) => {
                                const isActive = secondLvl === text;

                                return (
                                    <Link className={cx('link')} to={`/${firstLvl}/${text}`}>
                                        <ListItem button key={text} selected={isActive}>
                                            <ListItemText primary={text} />
                                        </ListItem>
                                    </Link>
                                );
                            })}
                        </List>
                    </Drawer>
                </div>
            )}
            <div className={cx('page-element', 'content')}>
                {<JsxParser components={{ Typography, Paper }} jsx={content[decodeURI(pathName)]} />}
            </div>
            <a href="https://material-ui.com/components/box/" target="_blank" className={cx('fixed-link')}>Компоненты</a>
        </div>
    );
};

export default MainPage;
