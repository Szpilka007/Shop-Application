import React from 'react';
import '../../css/header.scss'
import { Link } from 'react-router-dom';

class Header extends React.Component {

    render(){
        return (
            <header>

                <div className='logo'>
                    <i>Shop</i>
                </div>

                <nav>
                    <ul>
                        <li className='first'>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/products'>Products</Link>
                        </li>
                        <li className='last'>
                            <Link to='/basket'>Basket</Link>
                        </li>
                    </ul>
                </nav>

            </header>
        );
    }

}

export default Header;
