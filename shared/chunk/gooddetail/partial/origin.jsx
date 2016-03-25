'use strict';

import React,{Component} from "react";
import {formatPrice} from "../../../lib/util.es6";

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
                            <span>税费=不含税商品单价*件数*商品税率</span>
                            <span>（根据海关规定，若订单税费≤50，海关予以免征）</span>
                            <i className="iconfont icon-right"></i>
                        </a>
                    </dd>
                </dl>
                <div className="smallLine"></div> 
                <dl>
                  <dt>税率：</dt>
                  <dd>{good.showTaxRate}</dd>
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