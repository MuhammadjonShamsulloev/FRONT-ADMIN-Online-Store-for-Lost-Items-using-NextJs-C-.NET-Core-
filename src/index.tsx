import React from 'react';
import { render } from 'react-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { CustomRouter, Routes } from '@routes';
import { ModalContainer } from '@components';
import { store } from '@store';
import '@fontsource/montserrat';
import '@styles/global.scss';
import { history } from '@utils/history';
import 'react-toastify/dist/ReactToastify.css';

const app = (
  <Provider store={store}>
    <CustomRouter history={history}>
      <Routes />
      <ModalContainer />
      <ToastContainer />
    </CustomRouter>
  </Provider>
);

const rootElement: HTMLElement = document.getElementById('root')!;

render(app, rootElement);
