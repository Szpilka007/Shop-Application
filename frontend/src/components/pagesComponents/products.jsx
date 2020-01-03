import React from 'react';
import '../../css/pages.css'
class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
        this.basket = [];
    }

    onAddToBasket(product1) {
        let basket = Object.values(JSON.parse(sessionStorage.getItem('basket')));
        let exist = false;
        console.log(basket.length);
            for(let item in basket){
                console.log(basket[item]);
            }

            for(let prop in basket) {
                if (basket[prop].product.id === product1.id) {
                    basket[prop].amount += 1;
                    exist = true;
                    console.log(exist);
                }
            }
            if(exist === false)
            {
                    let item = {
                        product: product1,
                        amount: 1
                    };
                    basket.push(item);
                }
        sessionStorage.setItem('basket', JSON.stringify(basket));
    }
    render() {
        const items = [this.state.products.map((product, i) =>
            <tr className='products-table-row' key={i}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price} </td>
                <td><input id={`amount-Id-${product.id}`} type='number' placeholder='Amount of products' /></td>
                <td><input onClick={() => this.onAddToBasket(product)} type='button' value='Add to Basket'/></td>
            </tr>
        )];

        return (
            <div id='products'>
                <h1>Products </h1>
                <div id='products-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if(sessionStorage.getItem('basket') === null) {sessionStorage.setItem('basket', JSON.stringify([]))};
        return fetch('http://localhost:8080/products').then(resp => Promise.resolve(resp.json()))
            .then(products => this.setState({products: products})).then(() => true)
    }
}
export default Products;
