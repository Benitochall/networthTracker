import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';
import NetWorth from './components/NetWorth'; 
import LoginPage from './LoginPage'; 
import ProtectedRoute from './ProtectedRoute'; 

function MainApp() {
  const [data, setData] = useState(null);
  const [authenticated, setAuthenticated] = useState(false); // Initialize authenticated state

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        <Switch>
          <Suspense fallback={<FallbackSpinner />}>
            <Route exact path="/" component={Home} />
            {data &&
              data.sections.map((route) => {
                const SectionComponent = React.lazy(() => import('./components/' + route.component));
                return (
                  <Route
                    key={route.headerTitle}
                    path={route.path}
                    component={() => (
                      <SectionComponent header={route.headerTitle} />
                    )}
                  />
                );
              })}
            <ProtectedRoute
              path="/networth"
              component={NetWorth}
              isAuthenticated={authenticated}
            />
            <Route path="/login" component={() => <LoginPage onLogin={() => setAuthenticated(true)} />} />
          </Suspense>
        </Switch>
      </main>
    </div>
  );
}

export default MainApp;
