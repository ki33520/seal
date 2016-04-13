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
                  <dt>关税：</dt>
                  <dd>
                        <a href="javascript:void(null)" onClick={this.props.changeScene.bind(this,"tariff")}
                         className="tariff">
                            <span>税费=不含税商品单价*件数*跨境电商综合税率</span>
                            <span>跨境电商综合税率=(消费税+增值税率)/(1-消费税率)*0.7</span>
                            <i className="iconfont icon-right"></i>
                        </a>
                    </dd>
                </dl>
                <div className="smallLine"></div> 
                <dl>
                  <dt>行邮税率：</dt>
                  <dd>{good.showTaxRate}</dd>
                </dl>
                <dl>
                  <dt>消费税率：</dt>
                  <dd>{good.consumerTax}</dd>
                </dl>
                <dl>
                  <dt>增值税率：</dt>
                  <dd>{good.addedTax}</dd>
                </dl>
                <dl>
                  <dt>运费：</dt>
                  <dd>{logistics}</dd>
                </dl>   
            </div>
        )
    }
}

export default Origin;