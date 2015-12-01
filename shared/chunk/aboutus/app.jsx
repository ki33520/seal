'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import {createStore} from "redux";
import createStoreWithMiddleware from "../../lib/store-creator.es6";
import Header from "../common/header.jsx";

class AboutUs extends Component{
    render(){
        return (
            <div className="aboutus-content">
                <Header>
                    <span className="title">关于我们</span>
                </Header>
                <img src="/client/asset/images/gywm.gif" />
                <p>友阿海外购是湖南友阿云商网络有限公司旗下的跨境O2O电商平台，是友阿集团旗下的自营海外正品特卖网站；</p>
                <p>友阿集团成立海外采购公司，深入货源产地直采，保证商品品质；重金批量采购，保证价格最具竞争力；自营备货，政府背书，7天无忧售后；和海关、保税区深入合作，电子化极速清关，下单后3-15个工作日送达。支持微信、支付宝、网银、信用卡等支付方式， 告别多币支付烦恼。</p>
                <div className="m-entry">
                    <span>海外直采</span>
                    <span>自营正品</span>
                    <span>海关监管</span>
                    <span>无忧退货</span>
                </div>
                <p>友阿海外购将力争在业界掀起一阵零经验、零风险的全民海淘风，让国人彻底摆脱私人代购和传统海淘的困扰。</p>
                <p>友阿海外购秉承着友阿：诚信为本，顾客至上的的经营理念，为广大客户提供最优质的商品和服务，立志成为中国跨 境电子商务的领头羊，让每一个消费者都能买到放心、优质、舒心的海外商品。</p>
            </div>
        )
    }
}

export default AboutUs;