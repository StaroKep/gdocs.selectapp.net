import React, { FunctionComponent } from 'react';
import cn from 'classnames/bind';
import { Link } from 'react-router-dom';

import { mainConfig } from 'src/config/mainConfig';
import { hierarchy } from 'src/compiledContent/hierarchy';
import { getPath, Path } from 'src/routerConfig';

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

import { MainMenuProps } from './MainMenu.types';

import * as styles from './MainMenu.pcss';

const cx = cn.bind(styles);

export const MainMenu: FunctionComponent<MainMenuProps> = props => {
    const { selectedElement } = props;
    const { appName } = mainConfig;
    const menuElements = Object.keys(hierarchy);

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
                <Link className={cx('link')} to={getPath(Path.HOME)}>
                    <Typography {...titleTypographyProps}>{appName}</Typography>
                </Link>
                <List>
                    {menuElements.map(text => {
                        const isSelectedElement = selectedElement === text;

                        const linkProps = {
                            key: text,
                            className: cx('link'),
                            to: `${getPath(Path.HOME)}${text}`,
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

export default MainMenu;
