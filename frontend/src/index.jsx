import { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Swagger UI is large, so it is only downloaded when someone visits /api-docs.
const ApiDocs = lazy(() => import('./pages/ApiDocs'));

const isApiDocs = window.location.pathname.startsWith('/api-docs');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    {isApiDocs ? (
      <Suspense fallback={<p>Loading API docs…</p>}>
        <ApiDocs />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
