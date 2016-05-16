'use strict';

import React,{Component} from "react";
import {formatPrice} from "../../../lib/helper.es6";

class Origin extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {good} = this.props;
        const {useOutlandLogistics,outlandLogisticsFee} = good
        let logistics = useOutlandLogistics?<em>&yen;{formatPrice(outlandLogisticsFee)}</em>:"包邮"
        return (
            <div className="overView">
                <dl>
                  <dt>原产地：</dt>
                  <dd><i><img src={good.originFlag} alt="" /></i>{good.originName}</dd>
                </dl>
                <dl>
                  <dt>发货仓：</dt>
                  <dd>{good.warehouseName}</dd>
                </dl>
                <div className="smallLine"></div>
                <dl className="tax-panel">
                   <dd>
                    <a href="http://a.tepin.hk/h/rule/valueTable_h.html"
                         className="tariff">
                      <div>
                        <b></b>
                        <span dangerouslySetInnerHTML={{__html:good.rateDescription}}></span>
                      </div>
                      <div>
                        <b></b>
                        <span dangerouslySetInnerHTML={{__html:good.tariffDesc}}></span>
                      </div>
                      <i className="iconfont icon-right"></i>
                    </a>
                   </dd>
                 </dl> 
            </div>
        )
    }
}

export default Origin;