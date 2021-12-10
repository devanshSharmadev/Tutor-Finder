
import {BrowserRouter,Route, Switch,Redirect} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Login from './components/Login'
import Home from './components/Home/Home';
import PostDetails from './components/Profiledetails/ProfileDetails'
import BuyPage from './components/BuyPage/BuyPage';
import 'react-notifications/lib/notifications.css';
function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
        <Switch>
        <Route exact path="/login" component={Login}/>
          <Route exact path="/" component={Home}/>
          <Route path="/search" exact component={Home} />
          <Route path="/BuyMembership" exact component={BuyPage} />
          <Route path="/:id" exact component={PostDetails} />
        </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
