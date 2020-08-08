import React from 'react';
import './App.css';
import {BrowserRouter , Route} from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Shoppage from './Pages/Shoppage';
import Navstuff from './components/Navstuff';
import Cartpage from './Pages/Cartpage';
import { useSelector } from 'react-redux';
import UserSigninpage from './Pages/UserSigninpage';
import UserRegisterpage from './Pages/UserRegisterpage';
import SellerSigninpage from './Pages/SellerSigninpage';
import SellerRegisterpage from './Pages/SellerRegisterpage';
import Sellerinventorypage from './Pages/Sellerinventorypage';
import Sellerproductspage from './Pages/Sellerproductspage';


function App() {

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

    return (
      <BrowserRouter>
      <div>
        <Navstuff />
        <Route path="/user/signin" component={UserSigninpage} />
        <Route path="/user/register" component={UserRegisterpage} />
        <Route path="/seller/signin" component={SellerSigninpage} />
        <Route path="/seller/register" component={SellerRegisterpage} />
        <Route path="/createshop/:id" component={Sellerinventorypage} />
        <Route path="/addproducts/:id" component={Sellerproductspage} />
        <Route path="/" exact={true} component={Homepage}/>
        <Route path="/shop/:id" component={Shoppage}/>
        <Route path="/cart/:id?" component={Cartpage}/>
      </div>
      </BrowserRouter>
        
    );
}

export default App;
  