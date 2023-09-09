import React from 'react';
import ReactDOM from 'react-dom/client';
import { Popup } from './PopupPage'
import './popup.scss'

const popupEl = document.createElement('div')
popupEl.setAttribute('id', 'popup')
document.body.appendChild(popupEl)

ReactDOM.createRoot(document.getElementById('popup')!).render(
  <Popup />,
)