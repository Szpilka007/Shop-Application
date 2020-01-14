import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';




import MainPage from './components/mainPage';
import Products from "./components/products";
import Orders from "./components/orders";
import Header from "./components/header"

class App extends React.Component {

  render() {
    return (
        <Router>
          <div className="App">

              <Header />

              <Route exact path='/' component={MainPage} />
              <Route exact path='/products' component={Products} />
              <Route exact path='/orders' component={Orders}/>

          </div>
        </Router>
    );
  }

}

export default App;
