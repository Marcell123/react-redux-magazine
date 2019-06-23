import React from 'react';
import ReactDOM from 'react-dom';
import { thunkAction } from './redux/actions/thunkAction';
import { connect } from 'react-redux';

import axios from 'axios';
import Products from './components/Products';
import SizeFilter from './components/SizeFilter';
import Cart from './components/Cart';
import './scss/style.scss';

class App extends React.Component {
  constructor() {
    super();
    this.handleCheck = this.handleCheck.bind(this);
    this.getDecimal = this.getDecimal.bind(this);
    this.state = {
      items: ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'],
    };
  }

  componentDidMount() {
    this.props.thunkAction();
  }

  getDecimal(number) {
    //Grab decimal from price in order to set a styles on it
    //(handed over to Products=>Product component)

    let str = "" + number; // 1
    //Calculate decimal
    let decimal = (parseFloat(number) - Math.floor(number)).toFixed(2);

    //Grab zero before comma(when let decimal gives us 0 as a result)
    let zeroMatch = decimal.toString().indexOf('.');
    let zeroPos = str.indexOf("."); // 2
    let fixedDecimal = str.slice(zeroPos)

    if (zeroPos == -1) {
      //Get rid of zero before comma by turning it into a string
      str = decimal.slice(zeroMatch);
    } else {
      str = '.' + decimal.slice(zeroPos); // 4
    };

    return str;
  };

  formatPrice(a, b) {
    //(handed over to Products=>Product component)
    let num = (a / b);
    if( String(num).split('.').length < 2 || String(num).split('.')[1].length <= 2 ) {
      num = num.toFixed(2);
    } else {
      num = num.toFixed(2);
    };
    return num;
  };

  handleCheck(filter) {
    //Size filter on checkbox
    //(handed over to SizeFilter component)
    this.setState({
      items: filter
    });
  };

  render() {
    return(
      <div className="main">
        <SizeFilter 
          updateFilters={this.handleCheck}
        />
        <Products
          updateFilters={this.state.items}
          updatePrice={this.handlePrice}
          getDecimal={this.getDecimal}
          formatPrice={this.formatPrice}
        />
        <Cart />
      </div>
    );
  }
};

export default connect(
  null,
  { thunkAction }
)(App);
