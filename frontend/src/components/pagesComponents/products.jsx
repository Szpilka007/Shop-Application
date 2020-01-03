import React from 'react';
import '../../css/pages.css'
import _ from 'lodash';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filteredProducts:[],
            categories:[],
            actualCategory: ""
        };
    }

    filterProducts() {
        let category = this.state.actualCategory;
        let filteredProduct = _.filter(this.state.products, function (product) {
            return product.category.includes(category);
        });
        this.setState({
            filteredProducts: filteredProduct
        });
    }
    onAddToBasket(product) {
        let basket = Object.values(JSON.parse(sessionStorage.getItem('basket')));
        let exist = false;
            for(let prop in basket) {
                if (basket[prop].product.id === product.id) {
                    basket[prop].amount += 1;
                    exist = true;
                }
            }
            if(exist === false)
            {
                    let item = {
                        product: product,
                        amount: 1
                    };
                    basket.push(item);
                }
        sessionStorage.setItem('basket', JSON.stringify(basket));
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, function ()
        {
            this.filterProducts();
        });
    };

    render() {
        const items = [this.state.filteredProducts.map((product, i) =>
            <tr className='products-table-row' key={i}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price} </td>
                <td><input id={`amount-Id-${product.id}`} type='number' placeholder='Amount of products' /></td>
                <td><input onClick={() => this.onAddToBasket(product)} type='button' value='Add to Basket'/></td>
            </tr>
        )];

        const categories = [this.state.categories.map((category, i) =>
                <option value={category.name} key={i}>{category.name}</option>
        )];

        return (
            <div id='products'>
                <h1>Products </h1>
                <form>
                    <select name="actualCategory" onChange={this.changeHandler}>
                        <option value="">Any</option>
                        {categories}
                    </select>
                </form>
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
        if(sessionStorage.getItem('basket') === null) {sessionStorage.setItem('basket', JSON.stringify([]))}

        fetch('http://localhost:8080/categories').then(resp => Promise.resolve(resp.json()))
            .then(categories => this.setState({categories: categories})).then(() => true);
        fetch('http://localhost:8080/products').then(resp => Promise.resolve(resp.json()))
            .then(products => this.setState({products: products, filteredProducts: products})).then(() => true)
    }
}
export default Products;
