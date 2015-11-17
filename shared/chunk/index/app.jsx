'use strict'
import React from "react";
import {bindActionCreators} from "redux";
import {Provider,connect} from "react-redux";
import rootReducer from "./reducer.es6";
import createStoreWithMiddleware from "../../lib/store-creator.es6";
import Weather from "./component.jsx";

class WeatherWrapper extends Component{
    render(){
        return (
            <Weather {...this.props} 
            {...bindActionCreators(actions,this.props.dispatch)}/>
        )
    }
}

let WeatherConnected = connect((state)=>{
    return state;
})(WeatherWrapper);

class WeatherApp extends React.Component{
    render(){
        const {weather} = this.props.initialState;
        var store = createStoreWithMiddleware(rootReducer,{
            weatherByCityName:{
                isFetching:false,
                weather
            }
        });
        return (
            <Provider store={store}>
            <WeatherConnected />
            </Provider>
        )
    }
}

export default WeatherApp;