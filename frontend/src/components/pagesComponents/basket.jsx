import React from 'react';
import '../../css/pages.css'
import '../../css/common.dialogs.scss'
import '../../css/basketPages.css'
import axios from 'axios'
import Dialogs from '../../utils/dialogs.js'

const {$id} = require('../../utils/idUtils');

class Basket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            acceptDate: null,
            orderStatus: null,
            userName: null,
            email: null,
            phoneNumber: null,
            productList: JSON.parse(sessionStorage.getItem('basket'))
        };
    }

    clearState() {
        this.setState({
            acceptDate: null,
            orderStatus: null,
            userName: null,
            email: null, phoneNumber: null,
            productList: JSON.parse(sessionStorage.getItem('basket')
            )
        })
    }

    round(n, k)
    {
        let factor = Math.pow(10, k);
        return Math.round(n*factor)/factor;
    }

    calculateValue() {
        let sum = 0;
        for (let item in this.state.productList) {
            sum += (this.state.productList[item].product.price * this.state.productList[item].amount);
        }
        return this.round(sum,2);
    }

    onIncrease(item) {
        let basket = JSON.parse(sessionStorage.getItem('basket'));
        for (let prop in basket) {
            if (basket[prop].product.id === item.product.id) {
                basket[prop].amount = parseInt(basket[prop].amount) + 1;
                break;
            }
        }
        sessionStorage.setItem('basket', JSON.stringify(basket));
        this.setState({
            productList: basket
        })
    }

    onDecrease(item) {
        let basket = JSON.parse(sessionStorage.getItem('basket'));
        let index = null;
        for (let prop in basket) {
            if (basket[prop].product.id === item.product.id) {
                basket[prop].amount = parseInt(basket[prop].amount) -1;
                if (basket[prop].amount === 0) {
                    index = prop;
                }
                break;
            }
        }
        if (index != null) basket.splice(index, 1);
        sessionStorage.setItem('basket', JSON.stringify(basket));
        this.setState({
            productList: basket
        })
    }

    inputChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitHandler = (event) => {

        event.preventDefault();
        let tempDate = new Date();
        let date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        Dialogs.confirm(
            'Stworzenie Zamówienia',
            'Czy na pewno chcesz stworzyć zamówienie z podanymi danymi?',
            () => {
                console.log(this.state.product)
                this.setState({
                    acceptDate: date,
                    orderStatus: 'Not approved'
                }, function () {
                    axios.post('http://localhost:8080/orders', this.state).then()
                });
                this.clearState();
                this.hideSection();
                this.showSection('empty-basket-section')
            }
        );

    };

    validateInput() {

    }

    render() {
        const items = [this.state.productList.map((item, i) =>
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
                <h1 id='basket-title'>Basket </h1>

                <section className="section" id='empty-basket-section'>
                    <h3>Your Basket is Empty!</h3>
                </section>

                <section className="section" id='not-empty-basket'>
                    <div>
                        <h3 id='order-title'>Your Order</h3>
                    </div>
                    <div id='table-with-ordered-products'>
                        <table class="table table-striped  table-hover">
                            <thead id='head-table-with-products'>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Amount</th>
                                <th>Decrease</th>
                                <th>Increase</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items}
                            </tbody>
                        </table>
                        <hr/>
                        <p>Lacznie: {this.calculateValue()} zł.</p>

                        <input class="btn btn-secondary" value='Accept order' type='button' onClick={() => {
                            this.hideSection();
                            this.showSection('form-to-fill')
                        }}/>
                    </div>


                </section>

                <section className="section" id='form-to-fill'>
                    <div id='form-additional-information' class='container'>
                        <h2 id='form-title'>Additional information</h2>
                        <form class="form-group" onSubmit={this.submitHandler} class="was-validated">
                            <div>
                                <label htmlFor="uname">First Name:</label>
                                <input id="firstName" type="text" class="form-control" name="userName" placeholder="Enter first name"
                                       onChange={this.inputChangeHandler} required/>
                                    <div className="valid-feedback">Valid</div>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input id="email" type="text" className="form-control" name="email"
                                       placeholder="Enter email"
                                       onChange={this.inputChangeHandler} required/>
                                <div className="valid-feedback">Valid</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                            <div>
                                <label htmlFor="phonenumber">Phone Number:</label>
                                <input id="phoneNumber" type="text" className="form-control" name="phoneNumber"
                                       placeholder="Enter phone number"
                                       onChange={this.inputChangeHandler} required/>
                                <div className="valid-feedback">Valid</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                            <button id='send-order-button' class="btn btn-secondary" type='submit'>Send order</button>
                        </form>
                    </div>
                </section>

                <div id="dialogs"/>

            </div>
        );
    }

    componentDidMount() {

        if (this.state.productList.length > 0)
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
