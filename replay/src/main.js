import 'es6-shim';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import Classroom from './containers/Classroom';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDom.render(
    <Provider store={store}>
        <Classroom />
    </Provider>,
    document.getElementById('main')
);
