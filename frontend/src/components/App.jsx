import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
// components
import Header from './headerComponents/header';
import Footer from './footerComponent/footer';
import HomePage from './pagesComponents/homePage';
import Products from './pagesComponents/products';
import Basket from './pagesComponents/basket';

class App extends React.Component {

    render() {
        return (
            <Router>
                <div className="App">

                    <Header/>

                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/products' component={Products} />
                    <Route exact path='/basket' component={Basket} />

                    <Footer/>
                </div>
            </Router>
        );
    }


}

export default App;
