import React from 'react';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = { products: "" }
    }


  render(){
    return (
        <div>
            { this.state.products }
        </div>
    );
  }

  componentDidMount() {
      fetch("http://localhost:8080/products").then(resp => {
          Promise.resolve(resp.json()).then(str => {
              this.setState({ products: str.toString() })
          })
      })
  }

}

export default App;
