import React from 'react';
import ReactDOM from 'react-dom/client';
import { GOOGLE,ETSY } from './utils/constants';
import { MenuComponent } from './scriptComponent/mainPage'

const utilEl = document.createElement('div')
utilEl.setAttribute('id', 'menu__ed')
document.body.appendChild(utilEl);

let page: string;
let type:string
const getTabType  = new Promise((resolve,reject) => {
  chrome.runtime.sendMessage({ query:'getTabUrl' }, (response) => {
    if (response === 'google') {
    page = GOOGLE
    }else if(response === 'etsy'){
      page = ETSY
    }
    return resolve(response)
  })
})

getTabType.then((type) => { if (utilEl) {
  ReactDOM.createRoot(utilEl).render(<MenuComponent type={page} />)
} else {
  console.error('Element not found');
}
})
