import React from 'react';
import { createRoot } from 'react-dom/client';
import Playground from './components/Playground';
import './style.css';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Playground />
    </React.StrictMode>
);
