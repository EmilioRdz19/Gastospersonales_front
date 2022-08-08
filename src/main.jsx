import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import './index.css'

import global_en from './translations/en/global.json'
import global_es from './translations/es/global.json'

import axios from 'axios'
const URL = import.meta.env.VITE_RUTA_API;
axios.defaults.baseURL = URL;

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'es',
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    },
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
