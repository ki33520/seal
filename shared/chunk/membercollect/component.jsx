'use strict'

import React,{Component} from "react";
import _ from "lodash";
import classNames from "classnames";
import dom from "../../lib/dom.es6";
import {apiRequest} from "../../lib/util.es6";
import Slider from "../../component/slider/slider.jsx";
import Slide from "../../component/slider/slide.jsx";
import NumberPicker from "../../component/numberpicker.jsx";
import PullHook from "../../component/pullhook.jsx";
import Alert from "../../component/alert.jsx";
import Header from "../common/header.jsx";

import Node from "./partial/node.jsx";
import {fetchCollect} from "./action.es6";
import {alert} from "../common/action.es6";

class MembercollectList extends Component{
    constructor(props){
        super(props);
        this.state = {
            collect: props.memberCollectByUser.collect
        }
    }
    render(){
        const {collect} = this.state;
        var tpl = (
            <div className="collect-content">
                <Header title="我的收藏"/>
                <Node collect={collect} />
            </div>
        );
        return tpl;
    }
}


export default MembercollectList;