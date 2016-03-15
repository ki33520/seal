'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import MemberUpdate from "./component.jsx";
import * as actions from "./action.es6";

let ReceiverConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(MemberUpdate,actions));

function configureStore(initialState){
    const store = createStoreWithMiddleware(rootReducer, initialState)
    if (module.hot) {
        module.hot.accept('./reducer.es6', () => {
            const nextRootReducer = require('./reducer.es6');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store
}

class MemberupdateApp extends Component{
    render(){

        const {memberInfo,passwordByForm,membercardByForm} = this.props.initialState;
        memberInfo.fieldnickName = memberInfo.nickName;
        memberInfo.fieldgender = memberInfo.gender;
        const initialState = {
            basicByForm: memberInfo,
            passwordByForm: {
                oldPassword: "",
                password: "",
                repeatPassword: ""
            },
            membercardByForm
        };
        var store = configureStore(initialState);
        return (
            <Provider store={store}>
            <ReceiverConnected />
            </Provider>
        )
    }
}

export default MemberupdateApp;