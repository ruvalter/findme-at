import React, { useState } from 'react';
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

  // const authToken = useRef(localStorage.getItem('AuthToken'));
  const { loggedUser, pending } = useAuthContext();

  const handleRoute = (route: string) => {
    setRouteClass(`${route || 'unknown'}-route`);
  };

  if (pending) {
    return <div>Loading...</div>;
  }

  // const routes = loggedUser ? (
  //   <Route path='/admin'>{loggedUser ? <Admin /> : <Signin />}</Route>
  // ) : (
  //   <>
  //     <Route path='/signin'>
  //       <Signin />
  //     </Route>
  //     <Route path='/signup'>
  //       <Signup />
  //     </Route>
  //     <Route path='/:exposedUrl'>
  //       <Links />
  //       <Footer />
  //     </Route>
  //   </>
  // );

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
          {/* <Route path='/' exact>
            <Redirect to='/admin' />
          </Route> */}

          <Route path='/admin'>{loggedUser ? <Admin /> : <Signin />}</Route>
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
          <Redirect from='/' to='/admin' />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
