import React, { useState } from 'react';
import "./App.scss";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Links from "./containers/links/Links";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Admin from "./containers/admin/Admin";
import MenuBar from './components/menu-bar/MenuBar';

const App = () => {
  const [routeClass, setRouteClass]: any = useState();

  const handleRoute = (route: string) => {
    setRouteClass(`${ route || 'unknown' }-route`);
  }

  return (
    <Router>
      <MenuBar handleRoute={handleRoute}></MenuBar>
      <main
        className={routeClass}
        style={{
          maxHeight: "100vh",
          maxWidth: '100%',
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "3rem",
          alignItems: "center",
        }}
      >
        <Header />
        <Switch>
          <Route path="/portuguesludico" exact>
            <Links />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Redirect to="/portuguesludico" />
        </Switch>
        <Footer />
      </main>
    </Router>
  );
}

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