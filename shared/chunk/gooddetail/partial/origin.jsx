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
                <dl>
                  <dt>运费：</dt>
                  <dd>{logistics}</dd>
                </dl>   
                <div className="smallLine"></div>
                <dl className="tax-panel">
                   <dd>
                    <a href="http://a.tepin.hk/h/rule/valueTable_h.html"
                         className="tariff">
                      <span><b>税费说明:</b>税费=不含税商品单价*件数*(跨境电商综合税率+行邮税率)</span>
                      <span><b>本品适合跨境综合税:</b></span>
                      <span>跨境电商综合税率=(消费税率+增值税率)/(1-消费税率)*0.7</span>
                      <i className="iconfont icon-right"></i>
                    </a>
                   </dd>
                 </dl> 
            </div>
        )
    }
}

export default Origin;