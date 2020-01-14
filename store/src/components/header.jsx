import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.scss'

class Header extends React.Component {

    render(){
        return (
            <header>

                <div className='logo'>
                    <i>Store management</i>
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
                            <Link to='/orders'>Orders</Link>
                        </li>
                    </ul>
                </nav>

            </header>
        );
    }

}

export default Header;
