import React from 'react';
import ReactDOM from 'react-dom/client';
import { OptionPage } from './OptionPage'

const popupEl = document.createElement('div')
popupEl.setAttribute('id', 'options_page')
document.body.appendChild(popupEl)

ReactDOM.createRoot(document.getElementById('options_page')!).render(
  <OptionPage />,
)