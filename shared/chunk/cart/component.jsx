'use strict';

import React,{Component} from "react";
import Header from "../common/header.jsx";

class Cart extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="cart-content">
                <Header title="购物车"/>
            </div>
        )
    }
}

export default Cart;