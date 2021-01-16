import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminLinks from '../admin-links/AdminLinks';
import AdminNetwork from '../admin-network/AdminNetwork';
import Profile from '../profile/Profile';

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <>
      {/* <div style={{ position: 'fixed', top: '15px', left: '100px'}}><b>Admin Dashboard -</b> https://link-explorer.web.app/portuguesludico</div> */}
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/links`} />
        </Route>
        <Route path={`${path}/links`}>
          <AdminLinks />
        </Route>
        <Route path={`${path}/social`}>
          <AdminNetwork />
        </Route>
        <Route path={`${path}/profile`}>
          <Profile />
        </Route>
      </Switch>
    </>
  );
};

export default Admin;
