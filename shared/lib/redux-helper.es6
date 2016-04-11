'use strict'
import {
    createStore, applyMiddleware,bindActionCreators,compose
}
from "redux";
import React,{Component} from "react";
import thunkMiddleware from "redux-thunk";
// import createLogger from "redux-logger";

// const logger = createLogger();

const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    typeof window === 'object' && 
    typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore)

export default createStoreWithMiddleware;

export function wrapComponentWithActions(UnwrapperComponent,actions){
    class WrappedComponent extends Component{
        render(){
            return (
                <UnwrapperComponent {...this.props} 
                {...bindActionCreators(actions,this.props.dispatch)}/>
            )
        }
    }
    return WrappedComponent;
}

