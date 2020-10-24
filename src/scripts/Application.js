import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import { BrowserRouter } from 'react-router-dom';

import { Main } from './Main.js';

import { store } from './store/store.js';

import './Application.css';

class Application extends Component {
    render() {
        return (
            <Provider store={store}>
                <SnackbarProvider
                    maxSnack={1}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                >
                    <BrowserRouter>
                        <div className="Application">
                            <Main />
                        </div>
                    </BrowserRouter>
                </SnackbarProvider>
            </Provider>
        );
    }
}

export { Application };
