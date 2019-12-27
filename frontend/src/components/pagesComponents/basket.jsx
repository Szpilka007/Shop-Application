import React from 'react';
import '../../css/pages.css'


const {$id} = require('../../utils/idUtils');

class Basket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listProducts: [],
            currentElement: null,
            firstName: null,
            email: null,
            phoneNumber: null
        }
    }


    render() {
        return (
            <div id='basket'>
                <h1>Basket </h1>
                <section class="section" id='empty-basket-section'>

                    <h1>Your Basket is Empty!</h1>
                    <input type='button' onClick={() => {
                        this.hideSection();
                        this.showSection('not-empty-basket')
                    }
                    }/>

                </section>
                <section class="section" id='not-empty-basket'>

                    <div>TABELA Z PRODUKTAMI</div>
                    <input type='button' onClick={() => {
                        this.hideSection();
                        this.showSection('form-to-fill')
                    }}/>

                </section>
                <section class="section" id='form-to-fill'>

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
