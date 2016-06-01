'use strict';

import React,{Component} from "react";
import IDcard from "./partial/idcard.jsx";
import AddIDcard from "./partial/addidcard.jsx";
import UpdateIdcard from "./partial/updateidcard.jsx";
import {SceneGroup,Scene} from "../common/scene.jsx";

class IDcardRouter extends Component{
    verifyName(gets){
        return /^([\u4e00-\u9fa5\.]{2,10})$/.test(gets);
    }
    verifyIdCard(gets){
        var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];
        var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
        if (gets.length == 15) {   
            return isValidityBrithBy15IdCard(gets);   
        }else if (gets.length == 18){   
            var a_idCard = gets.split("");
            if (isValidityBrithBy18IdCard(gets)&&isTrueValidateCodeBy18IdCard(a_idCard)) {   
                return true;   
            }   
            return false;
        }
        return false;
        function isTrueValidateCodeBy18IdCard(a_idCard) {   
            var sum = 0;
            if (a_idCard[17].toLowerCase() == 'x') {   
                a_idCard[17] = 10;
            }   
            for ( var i = 0; i < 17; i++) {   
                sum += Wi[i] * a_idCard[i];
            }   
            var valCodePosition = sum % 11;
            if (a_idCard[17] == ValideCode[valCodePosition]) {   
                return true;   
            }
            return false;   
        }
        function isValidityBrithBy18IdCard(idCard18){   
            var year = idCard18.substring(6,10);   
            var month = idCard18.substring(10,12);   
            var day = idCard18.substring(12,14);   
            var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
            if(temp_date.getFullYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
                return false;   
            }
            return true;   
        }
        function isValidityBrithBy15IdCard(idCard15){   
            var year =  idCard15.substring(6,8);   
            var month = idCard15.substring(8,10);   
            var day = idCard15.substring(10,12);
            var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
            if(temp_date.getYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){   
                return false;   
            }
            return true;
        }
    }

    handleSceneChange(currentScene,param,prevScene){
        switch(currentScene){
            case "updatecard":
                //!this.props.isFetching && this.props.fetchCardById(param.id)
                break;
            case "index":
                //this.props.updateCardID.isUpdateCarded&&this.props.fetchCardList();
                break;
            default:

        }
    }
    render(){
        return (
            <SceneGroup onChange={this.handleSceneChange.bind(this)}>
                <Scene name="index"><IDcard {...this.props.cardID} {...this.props}/></Scene>
                <Scene name="addcard"><AddIDcard verifyName={this.verifyName} verifyIdCard={this.verifyIdCard} {...this.props.addCardID} {...this.props}/></Scene>
                <Scene name="updatecard"><UpdateIdcard verifyName={this.verifyName} verifyIdCard={this.verifyIdCard} {...this.props.updateCardID} {...this.props}/></Scene>
            </SceneGroup>
        );
    }
}

export default IDcardRouter;