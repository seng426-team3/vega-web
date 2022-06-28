import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useContext} from 'react';
import HomePageLayout from './components/templates/HomePageLayout.js';
import NotFound404Page from './components/pages/NotFound404Page.js';
import UserRegistrationPageLayout from './components/templates/UserRegistrationPageLayout.js'
import { Route, Switch, Redirect } from 'react-router-dom';
import Platform from './components/pages/Platform.js';
import Login from './components/pages/Login.js';
import NewsAndEvents from './components/pages/NewsAndEvents.js';
import Resources from './components/pages/Resources.js';
import AdminPanel from './components/pages/AdminPanel.js';
import Leadership from './components/pages/Leadership.js';
import UserRegistration from './components/pages/UserRegistration.js';
import VegaVault from './components/pages/VegaVault';
import {UserProvider} from './auth/UserProvider.js';
import {UserContext} from './auth/UserProvider.js';
import UserAccount from './components/pages/UserAccount.js';
import AboutUs from './components/pages/AboutUs.js';
import SignUp from './components/pages/SignUp.js';
import ContactUs from './components/pages/ContactUs.js';

function App() {
  

  const {user, setUserInfo, logout} = useContext(UserContext);

  return (
   <UserProvider value ={user, setUserInfo, logout}> 
        <Switch>
        	<Route path="/" component={HomePageLayout} exact />
        	<Route path="/contactus" component={ContactUs} exact />
        	<Route path="/leadership" component={Leadership} exact />
        	<Route path="/news" component={NewsAndEvents} />
        	<Route path="/platform" component={Platform} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/account" component={UserAccount} />
          <Route path="/resources" component={Resources} />
          <Route path="/adminpanel" component={AdminPanel} />
          <Route path="/vega-vault" component={VegaVault} />
          <Route path="/aboutus" component={AboutUs}/>
          <Route path="/404" component={NotFound404Page} />
          <Redirect to="/404" />
        </Switch>
    </UserProvider>
  );
}



export default App;
