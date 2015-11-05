'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Dropdown from "../dropdown/dropdown.jsx";
import Icon from "../core/icon.jsx";
import Slider from "../slider/slider.jsx";
import Slide from "../slider/slide.jsx";
import Timepicker from "../datetimepicker/timepicker.jsx";

class SelectedSlide extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:this.props.value,
        }
    }
    getValue(){
        return this.state.value;
    }
    hasValue(value){
        return value === this.state.value;
        // return this.getValueArray().indexOf(value) > -1;
    }
    setValue(value,activeIndex){
        this.setState({
            value,
            activeIndex
        },()=>{
            this.props.onChange(value);
        })
    }
    handleCheck(activeIndex,e){
        e && e.preventDefault();
        var checkedOption;
        this.props.options.forEach((option,i)=>{
            if(activeIndex === i){
                checkedOption = option;
            }
        })
        var selectedValue = checkedOption.value;
        this.setValue(selectedValue,activeIndex);
            // this.refs.dropdown.setDropdownState(false);
    }
    renderStatus(labels){
        return labels.map((label)=>{
            return (
                <div className="selected-label">{label}</div>
            );
        })
    }
    renderItem(){
        var selectedLabels = [];
        var activeIndex;
        var items = [];
        var groupHeader;
        const {selectedIcon,unselectedIcon} = this.props;
        this.props.options.forEach((option,i)=>{
            const checked = this.hasValue(option.value);
            const checkedClass = checked?"checked":null;
            const checkedIcon = checked?<Icon icon={selectedIcon}/>:
            unselectedIcon === null?null:<Icon icon={unselectedIcon}/>;
            checked && selectedLabels.push(option.label);
            checked && (activeIndex = i);
            items.push(
                <Slide className={checkedClass} 
                key={"item-"+i} >
                <span className="selected-item">{option.label}</span>
                {checkedIcon}
                </Slide>
            );
        });
        // console.log('selectedLabels',selectedLabels)

        return {selectedLabels,activeIndex,items};
    }
    redrawSlider(){
        const slider = this.refs.dropdownSlide;
        // if(slider.isMounted){
        slider.initialize();
        // }
    }
    render(){
        const classes = classNames(this.props.className,"selected","selected-slide");
        const {items,selectedLabels,activeIndex} = this.renderItem();
        const status = (
            <span className="status">{selectedLabels.length > 0?
            (selectedLabels.length > 1?this.renderStatus(selectedLabels):
            selectedLabels.join(",")):(
                <span className="placeholder">{this.props.placeholder}</span>
            )
            }</span>
        )
        // console.log('items',this.props.options,items)
        return (
            <Dropdown className={classes} title={status} 
            onOpen={this.redrawSlider.bind(this)}
            ref="dropdown" {...this.props}>
            <Slider 
            controlNav={false} 
            autoPlay={false}
            loop={false}
            onChange={this.handleCheck.bind(this)}
            defaultActiveIndex={activeIndex}
            oriention="vertical" ref="dropdownSlide">{items}</Slider>
            <input type="hidden" value={this.state.value}/>
            </Dropdown>
        )
    }
}

SelectedSlide.defaultProps = {
    placeholder:"点击请选择...",
    selectedIcon:"ok",
    unselectedIcon:null,
    maxHeight:null,
    minWidth:null,
    infinity:false,
    onChange:function(){}
};


export default SelectedSlide;