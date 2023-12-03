import React from 'react';
import ReactDOM from 'react-dom/client';
import AppNativeblocks from './AppNativeblocks';

const rootEl = document.getElementById('root')
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(<AppNativeblocks/>);
}