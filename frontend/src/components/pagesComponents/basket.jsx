import React from 'react';
import '../../css/pages.css'


const {$id} = require('../../utils/idUtils');

class Basket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            basket: JSON.parse(sessionStorage.getItem('basket')),
            currentElement: null,
            firstName: null,
            email: null,
            phoneNumber: null
        }
    }


    onIncrease(item){
        let basket = JSON.parse(sessionStorage.getItem('basket'));
        for(let prop in basket)
        {
            if (basket[prop].product.id === item.product.id)
            {
                basket[prop].amount += 1;
                break;
            }
        }
        sessionStorage.setItem('basket', JSON.stringify(basket));
        this.setState({
            basket: basket
        })
    }

    onDecrease(item) {
        let basket = JSON.parse(sessionStorage.getItem('basket'));
        let index = null;
        for (let prop in basket)
        {
            if (basket[prop].product.id === item.product.id)
            {
                basket[prop].amount -= 1;
                if (basket[prop].amount === 0)
                {
                    index = prop;
                }
                break;
            }
        }
        if(index != null) basket.splice(index, 1);
        sessionStorage.setItem('basket', JSON.stringify(basket));
        this.setState({
            basket: basket
        })
    }

    render() {
        const items = [this.state.basket.map((item, i) =>
                <tr className='products-table-row' key={i}>
                    <td>{item.product.name}</td>
                    <td>{item.product.description}</td>
                    <td>{item.product.price} </td>
                    <td>{item.amount}</td>
                    <td><input onClick={() => this.onDecrease(item)} type='button' value='-'/></td>
                    <td><input onClick={() => this.onIncrease(item)} type='button' value='+'/></td>
                </tr>
            )];

        return (
            <div id='basket'>
                <h1>Basket </h1>
                <section className="section" id='empty-basket-section'>

                    <h1>Your Basket is Empty!</h1>
                        <input value='Fill from' type='button' onClick={() => {
                            this.hideSection();
                            this.showSection('not-empty-basket')
                        }
                        }/>

                </section>
                <section className="section" id='not-empty-basket'>
                    <h1>Your Order</h1>
                        <div id='table-with-ordered-products'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items}
                                </tbody>
                            </table>
                        </div>
                    <input value='Fill from' type='button' onClick={() => {
                        this.hideSection();
                        this.showSection('form-to-fill')
                    }}/>

                </section>
                <section className="section" id='form-to-fill'>

                    <form>
                        First name:<br/>
                        <input type="text" name="firstname"/>
                        <br/>
                        Email:<br/>
                        <input type="text" name="firstname"/>
                        <br/>
                        Phone Number<br/>
                        <input type="text" name="firstname"/>

                    </form>
                    <input type='button' value='Send Order' />
                </section>
            </div>
        );
    }

    componentDidMount() {
        if (this.state.listProducts.length > 0)
            this.showSection('not-empty-basket');
        else
            this.showSection('empty-basket-section')
    }


    showSection(name) {
        const newElement = $id(name);
        if (newElement && newElement !== this.currentElement) {
            this.currentElement = newElement;

            newElement.style.display = 'flex';
            setTimeout(() => {
                newElement.style.visibility = 'visible';
                newElement.style.opacity = '1';
            }, 100);
        }
    }


    hideSection() {
        this.currentElement.style.display = 'none';
        this.currentElement.style.visibility = 'hidden';
        this.currentElement.style.opacity = '0';
        this.currentElement = null;

    }
}

export default Basket;
