import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';

import './scss/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<div>Идет загрузка корзины...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
