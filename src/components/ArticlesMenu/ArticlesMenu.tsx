import React, { FunctionComponent } from 'react';
import cn from 'classnames/bind';
import { Link } from 'react-router-dom';
import get from 'lodash/get';

import { ArticlesMenuProps } from './ArticlesMenu.types';

import { hierarchy } from 'src/compiledContent/hierarchy';
import { getPath, Path } from 'src/routerConfig';

import * as styles from './ArticlesMenu.pcss';

import {
    Drawer,
    DrawerProps,
    List,
    ListItem,
    ListItemProps,
    ListItemText,
    Typography,
    TypographyProps,
} from '@material-ui/core';

const cx = cn.bind(styles);

export const ArticlesMenu: FunctionComponent<ArticlesMenuProps> = props => {
    const { section, selectedElement } = props;
    const articles = get(hierarchy, [section]);
    const menuElements = Object.keys(articles);

    if (articles === 'md') {
        return null;
    }

    const rootClassNames = cx('root');

    const drawerProps = {
        variant: 'permanent',
        anchor: 'left',
        classes: {
            paper: cx('paper'),
        },
    } as DrawerProps;

    const titleTypographyProps = {
        classes: {
            root: cx('title'),
        },
        variant: 'h5',
        align: 'center',
        noWrap: true,
    } as TypographyProps;

    return (
        <div className={rootClassNames}>
            <Drawer {...drawerProps}>
                <List>
                    {menuElements.map(text => {
                        const isSelectedElement = selectedElement === text;

                        const linkProps = {
                            key: text,
                            className: cx('link'),
                            to: `${getPath(Path.HOME)}${section}/${text}`,
                        };

                        const listItemProps: ListItemProps = {
                            button: true,
                            selected: isSelectedElement,
                        };

                        return (
                            <Link {...linkProps}>
                                <ListItem {...listItemProps}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            </Link>
                        );
                    })}
                </List>
            </Drawer>
        </div>
    );
};

export default ArticlesMenu;
