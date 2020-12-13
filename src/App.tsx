import React, { useEffect, useState } from 'react';
import './App.scss';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import Links from './containers/links/Links';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Admin from './containers/admin/Admin';
import MenuBar from './components/menu-bar/MenuBar';
import Signin from './containers/public/signin/Signin';
import Signup from './containers/public/signup/Signup';
import { useAuthContext } from './shared/providers/auth-provider';

const App = () => {
  const [routeClass, setRouteClass]: any = useState();
  const [isLogged, setIsLogged] = useState();

  // const authToken = useRef(localStorage.getItem('AuthToken'));
  const { loggedUser } = useAuthContext();

  const handleRoute = (route: string) => {
    setRouteClass(`${route || 'unknown'}-route`);
  };

  useEffect(() => {
    setIsLogged(loggedUser?.logged);
  }, [loggedUser]);

  return (
    <Router>
      <MenuBar handleRoute={handleRoute}></MenuBar>
      <main
        className={routeClass}
        style={{
          // maxHeight: "100vh",
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '3rem 0 5rem',
          alignItems: 'center',
        }}
      >
        <Header />
        <Switch>
          <Route path='/' exact>
            <Redirect to='/admin' />
          </Route>
          <Route path='/admin'>
            {isLogged || true ? <Admin /> : <Redirect to='/signin' />}
          </Route>
          <Route path='/signin'>
            <Signin />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/:exposedUrl'>
            <Links />
            <Footer />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;

// TODO:
//
// For now:
//
// 4- Create Admin portal - high
// 3- Create project on firebase - backend - low
// 1- Add project to github - done
// 2- Create project on firebase - frontend - done
// 5- Create social network link list - done
// 6- Create Avatar header - done
//
// Later
//
// 7- Check PWA status
// 8- Check accessibility
// 9- Add Typescript
