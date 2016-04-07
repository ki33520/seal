'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Checkbox from "../../../component/form/checkbox.jsx";

class Invoice extends Component{
    constructor(props){
        super(props);
        this.state = {
            invoiceEnabled:false
        }
    }
    toggleInvoiceEnabled(){
        console.log('onChange')
        this.setState({
            invoiceEnabled:!this.state.invoiceEnabled
        });
    }
    render(){
        const invoiceFormClasses = classNames("invoice-form",{
            active:this.state.invoiceEnabled
        })
        return (
            <div className="confirm-invoice">
                <div className="invoice-toolbar">
                <Checkbox checked={this.state.invoiceEnabled}
                onChange={this.toggleInvoiceEnabled.bind(this)}/><div className="check-label">开具发票</div>
                </div>
                <div className={invoiceFormClasses}>
                <div className="invoice-form-row">
                <div className="invoice-form-label">发票抬头</div>
                <div className="invoice-form-input">
                <div><Checkbox type="radio" name="invoice-title"/><div className="check-label">个人</div></div>
                <div><Checkbox type="radio" name="invoice-title"/><div className="check-label">公司</div
                ><input type="text" placeholder="公司名称"/></div>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Invoice;