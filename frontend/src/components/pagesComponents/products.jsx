import React from 'react';
import '../../css/pages.css'

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {products: []};
    }

    render() {
        const items = [];
        for (const product of this.state.products) {
            items.push(
                <tr className='products-table-row'>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price} </td>
                    <td><input id={`amount-Id-${product.id}`} type='number' placeholder='Amount of products'/></td>
                    <td><input type='button' value='Add to Basket'/></td>
                </tr>
            )
        }
        return (
            <div id='products'>
                <h1>Products </h1>
                <div id='products-table'>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                        {items}
                    </table>
                </div>
            </div>
        );
    }

    componentDidMount() {
        return fetch('http://localhost:8080/products').then(resp => Promise.resolve(resp.json()))
            .then(products => this.setState({products: products})).then(() => true)
    }

}

export default Products;
