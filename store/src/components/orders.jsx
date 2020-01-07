import React from 'react';
import '../css/order.css'
import axios from 'axios'

class Orders extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            unrealizedOrders: [],
            realizedOrders: []
        }
    }

    changeStatusAndMoveToOtherTabel(order){
        const status = document.getElementById(`selectStatus${order.id}`).value;
        order.orderstatus = status;
        const realizedOrders = this.state.realizedOrders;
        const unrealizedOrders = this.state.unrealizedOrders;
        unrealizedOrders.pop()
        realizedOrders.push(order);

        this.setState({
            unrealizedOrders: unrealizedOrders,
            realizedOrders: realizedOrders
        })

    }

    render(){
        const staties = ['Canceled','Approved','Completed'];
        const possibleStaties = [staties.map((status, i) =>
            <option value={status} key={i}>{status}</option>
        )];
        const waitingOrders = [this.state.unrealizedOrders.map((order, i) =>

            <tr className='order-table-row' key={i}>
                <td>{order.username}</td>
                <td>{order.email}</td>
                <td>{order.phonenumber} </td>
                <td>{order.acceptdate}</td>
                <td>{order.productlist}</td>
                <select id={`selectStatus${order.id}`} className="form-control" name="actualCategory">
                    {possibleStaties}
                </select>
                <td><input className="btn btn-secondary " onClick={() => this.changeStatusAndMoveToOtherTabel(order)}  type='button'
                           value='Change Status'/></td>
            </tr>
        )];
        const doneOrders = [this.state.realizedOrders.map((order, i) =>
            <tr className='products-table-row' key={i}>
                <td>{order.username}</td>
                <td>{order.email}</td>
                <td>{order.acceptdate}</td>
                <td>{order.orderstatus}</td>
                <td>{order.productlist}</td>

            </tr>
        )];
        return (
            <div id='home-page'>

                <h1>Orders </h1>

                <h3>Orders waiting for decision</h3>

                <div>
                    <table class="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>email</th>
                            <th>Phone Number</th>
                            <th>Date</th>
                            <th>Product List</th>
                            <th>New Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        { waitingOrders }
                        </tbody>
                    </table>
                </div>

                <h3>Considered Orders</h3>

                <div>
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>email</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Product List</th>
                        </tr>
                        </thead>
                        <tbody>
                        { doneOrders }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }


    componentDidMount() {
        fetch('http://localhost:8080/orders').then(resp => Promise.resolve(resp.json()))
            .then(orders => {
                const realizedOrders = [];
                const unrealizedOrders = [];
                for(let i=0; i< orders.length; i++){
                    if(orders[i].orderStatus === 'Not approved')
                        realizedOrders.push(orders[i]);
                    else
                        unrealizedOrders.push(orders[i])

                }

                unrealizedOrders.forEach(order => {
                    let productListString = '';
                    const products = JSON.parse(order.productlist);
                    products.forEach(product => {
                        productListString += product.product.name + '{' + product.product.description + '}' + 'X' + product.amount + '   '
                    });
                    order.productlist = productListString
                })

                this.setState({
                    unrealizedOrders: unrealizedOrders,
                    realizedOrders: realizedOrders
                });



            })
    }
}


export default Orders;
