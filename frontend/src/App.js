import React from 'react';
import './App.css';
import {BrowserRouter , Route} from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Shoppage from './Pages/Shoppage';
import Navstuff from './components/Navstuff';
import Cartpage from './Pages/Cartpage';
import UserSigninpage from './Pages/UserSigninpage';
import { useSelector } from 'react-redux';
import UserRegisterpage from './Pages/UserRegisterpage';

//class App extends React.Component {
function App() {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  // render()
  // {
    return (
      <BrowserRouter>
      <div>
        <Navstuff />
        <Route path="/users/signin" component={UserSigninpage} />
        <Route path="/user/register" component={UserRegisterpage} />
        <Route path="/" exact={true} component={Homepage}/>
        <Route path="/shop/:id" component={Shoppage}/>
        <Route path="/cart/:id?" component={Cartpage}/>
      </div>
      </BrowserRouter>
        
    );
  // }
}

export default App;
  