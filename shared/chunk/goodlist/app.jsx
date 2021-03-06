
'use strict'
import React,{Component} from "react";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware,{wrapComponentWithActions} from "../../lib/redux-helper.es6";
import GoodList from "./component.jsx";
import * as actions from "./action.es6";

let GoodListConnected = connect((state)=>{
    return state;
})(wrapComponentWithActions(GoodList,actions));


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

class GoodListApp extends Component{
    render(){
        const {
            goodsList,keyword,filter,
            sortType,viewType,isHaveGoods,totalPage,pageIndex
        } = this.props.initialState;
        const initialState = {
            index:{
                totalPage,
                goodsList,
                filter,
                keyword,
                pageIndex,
                sortType,
                viewType,
                isHaveGoods,
                isFetching:false
            },
            search:{
                keyword:keyword
            }
        };
        let store = configureStore(initialState);
        return (
            <Provider store={store}>
            <GoodListConnected />
            </Provider>
        )
    }
}

export default GoodListApp;