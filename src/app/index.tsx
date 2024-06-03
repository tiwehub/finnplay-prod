import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from '@/app/routes/auth/login';
import Games from '@/app/routes/games/games.tsx';
import PrivateRoute from '@/app/routes/private-route.tsx';
import PublicRoute from '@/app/routes/public-route.tsx';
import { store } from '@/store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route path="/games" element={<PrivateRoute />}>
            <Route path="/games" element={<Games />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
