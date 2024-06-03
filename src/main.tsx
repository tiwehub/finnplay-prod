import './index.scss';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { NotificationProvider } from '@/components/ui/Notification/notification-provider.tsx';
import { store } from '@/store/store';

import App from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </Provider>,
);
