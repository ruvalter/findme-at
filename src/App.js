import './App.scss';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Links from './containers/links/Links';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
// import Admin from './containers/admin/Admin';

function App() {
  return (
    <Router>
      <main style={{minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'space-between', paddingTop: '3rem'}}>
      <Header/>
      <Switch>
        <Route path="/" exact>
          <Links/>
        </Route>
        <Route path="/links" exact>
          <Links/>
        </Route>
        {/* <Route path="/admin" exact>
          <Admin/>
        </Route> */}
        <Redirect to="/links" />
      </Switch>
      <Footer />
      </main>
    </Router>
  );
}

export default App;

// TODO: 
// 1- Add project to github - high
// 2- Create project on firebase - frontend - high
// 3- Create project on firebase - backend - low
// 4- Create Admin portal - low
// 5- Create social network link list - medium
// 6- Create Avatar header - high
// 7- Check PWA status
// 8- Check accessibility
// 9- Add Typescript