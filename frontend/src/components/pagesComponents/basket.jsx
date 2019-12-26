import React from 'react';

class Basket extends React.Component {

    constructor(props) {
        super(props);
        this.state = { listProducts: [] }
    }

    addProduct(product){
        this.setState({listProducts: product})
    }

    render(){
        return (
            <div id='basket'>

                <h1>Basket </h1>

                <div>Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis.
                    Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a,
                    ultricies porta urna. Vestibulum commodo

                </div>

                <input type='button' onClick={() => this.consoleProduct()} />
            </div>
        );
    }

    consoleProduct(){
        console.log(this.state.listProducts)
    }


}

export default Basket;
