import React, { FunctionComponent } from 'react';
import { Route, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import cn from 'classnames/bind';

import { MainPage } from 'src/pages/MainPage';

import { getPath, RouterPath } from 'src/routerConfig';

import * as styles from './Application.pcss';

const cx = cn.bind(styles);

export const Application: FunctionComponent = () => {
    return (
        <div className={cx('root')}>
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route path={getPath(RouterPath.HOME)}>
                        <MainPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default Application;
