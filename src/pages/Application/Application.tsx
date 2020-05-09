import React, { FunctionComponent } from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import cn from 'classnames/bind';

import Typography from '@material-ui/core/Typography';

import { MainPage } from 'src/pages/MainPage';

import { Path } from 'src/routerConfig';

import * as styles from './Application.pcss';

const cx = cn.bind(styles);

export const Application: FunctionComponent = () => {
    return (
        <div className={cx('root')}>
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route path={Path.HOME}>
                        <MainPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default Application;
