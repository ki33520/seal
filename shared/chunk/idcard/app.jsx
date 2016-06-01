
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import {createStore} from "redux";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import IDcard from "./component.jsx";
import * as actions from "./action.es6";

let IdcardConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(IDcard,actions));

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
 
class IDcardApp extends Component{
    render(){
        const {idcardLIst,isFetched,isUploaded} = this.props.initialState;
        let store = configureStore({
            cardID:{
                idcardLIst,
                isFetched,
                isFetching:false
            },
            addCardID:{
                isUploaded,
                isUploading:false,
                idcard:null
            },
            updateCardID:{
                isUploaded,
                isUploading:false,
                idcard:null
            }
        });
        return (
            <Provider store={store}>
                <IdcardConnected />
            </Provider>
        )
    }
}

export default IDcardApp;