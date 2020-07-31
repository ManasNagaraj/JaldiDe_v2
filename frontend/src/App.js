import React from 'react';
import './App.css';
import {BrowserRouter , Route} from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Shoppage from './Pages/Shoppage';
import Navstuff from './components/Navstuff';
import Cartpage from './Pages/Cartpage';

class App extends React.Component {
  render()
  {
    return (
      <BrowserRouter>
      <div>
        <Navstuff />
        <Route path="/" exact={true} component={Homepage}/>
        <Route path="/shop/:id" component={Shoppage}/>
        <Route path="/cart/:id?" component={Cartpage}/>
      </div>
      </BrowserRouter>
        
    );
  }
}

export default App;
  