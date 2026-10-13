import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('Al-Hindwan Service Worker registered successfully:', reg.scope);
    }).catch((err) => {
      console.log('SW registration error:', err);
    });
  });
}

createRoot(document.getElementById('root')!).render(<App />);

