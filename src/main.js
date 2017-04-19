import 'main.scss';

import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {render} from 'react-dom';

import {store, history} from 'reducer';

//import Navbar from 'view/navbar';
import Home from 'container/home';
import About from 'container/about';
import SideBar from 'view/Sidebar/index';
import DashBoard from 'view/DashBoard/index';


class App extends React.Component {
  render(){
    return (<Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <SideBar/>
          <DashBoard/>
        //   <Switch>
        //     <Route exact path="/" component={Home}/>
        //     <Route path="/about" component={About}/>
        //     <Redirect to="/"/>
        //   </Switch>
        </div>
      </ConnectedRouter>
    </Provider>);
  }
}


render(
  <App/>,
  document.getElementById('mount')
);
