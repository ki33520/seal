'use strict';

import React,{Component} from "react";
import classNames from "classnames";
import Dropdown from "../dropdown.jsx";
import Icon from "../icon.jsx";

class Selected extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:this.props.value,
            filterText:null
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.value !== this.props.value){
            this.setState({
                value:nextProps.value
            })
        }
    }
    getValueArray(){
        return this.state.value ? this.state.value.split(this.props.delimiter):[];
    }
    getValue(){
        return this.state.value;
    }
    hasValue(value){
        const {multiple} = this.props;
        if(multiple === true){
            return this.getValueArray().indexOf(value) > -1;
        }else{
            return this.getValue() === value;
        }
    }
    setValue(value){
        this.setState({
            value
        },()=>{
            this.props.onChange(value);
        })
    }
    handleCheck(option,e){
        e && e.preventDefault();
        var selectedValue = option.value;

        if(this.props.multiple){
            var values = this.getValueArray()
            if(this.hasValue(selectedValue)){
                values.splice(values.indexOf(selectedValue),1);
            }else{
                values.push(selectedValue);
            }
            this.setValue(values.join(this.props.delimiter));
        }else{
            this.setValue(selectedValue);
            if(this.props.closeOnSelect){
                this.refs.dropdown.setDropdownState(false);
            }
        }
    }
    handleFilterInput(e){
        e && e.preventDefault();
        this.setState({
            filterText:e.target.value
        })
    }
    clearFilterInput(){
        this.setState({
            filterText:null
        });
        React.findDOMNode(this.refs.filterInput).value = null;
    }
    renderItem(){
        const filterText = this.state.filterText;
        var selectedLabels = [];
        var items = [];
        var groupHeader;
        const {selectedIcon,unselectedIcon} = this.props;
        this.props.options.forEach((option,i)=>{
            const checked = this.hasValue(option.value);
            const checkedClass = checked?"checked":null;
            const checkedIcon = checked?<Icon icon={selectedIcon}/>:
            unselectedIcon === null?null:<Icon icon={unselectedIcon}/>;
            checked && selectedLabels.push(option.label);
            if(filterText && this.props.optionFilter(filterText,option) === false){
                return;
            }
            if(option.group && option.group !== groupHeader){
                groupHeader = option.group;
                const groupHeaderClasses = classNames({
                    "selected-group-header":true
                })
                items.push(
                    <li key={'header-'+i} className={groupHeaderClasses}>{groupHeader}</li>
                )
            }

            items.push(
                <li className={checkedClass} 
                key={"item-"+i} 
                onClick={this.handleCheck.bind(this,option)}>
                <span className="selected-item">{option.label}</span>
                {checkedIcon}
                </li>
            );
        });

        return {selectedLabels,items};
    }
    renderStatus(labels){
        return labels.map((label,i)=>{
            return (
                <div className="selected-label" key={i}>{label}</div>
            );
        })
    }
    render(){
        const classes = classNames(this.props.className,{
            "selected":true
        });
        
        let {items,selectedLabels} = this.renderItem();
        if(!this.props.multiple){
            selectedLabels = selectedLabels.slice(0,1)
        }
        const status = (
            <span className="status">{selectedLabels.length > 0?
            (selectedLabels.length > 1?this.renderStatus(selectedLabels):
            selectedLabels.join(",")):(
                <span className="placeholder">{this.props.placeholder}</span>
            )
            }</span>
        )

        const itemsStyle = {
            // maxHeight:this.props.maxHeight
        }
        return (
            <Dropdown className={classes} title={status} ref="dropdown" {...this.props}>
            {this.props.filterInput?(
                <div className="filter-input">
                <input type="text" onChange={this.handleFilterInput.bind(this)} ref="filterInput"/>
                <Icon icon="search"/>
                </div>
            ):null}
            <ul className="selected-items" style={itemsStyle}>{items}</ul>
            <input type="hidden" value={this.state.value}/>
            </Dropdown>
        )
    }
}

Selected.defaultProps = {
    delimiter:",",
    placeholder:"点击请选择...",
    selectedIcon:"ok",
    unselectedIcon:null,
    maxHeight:null,
    minWidth:null,
    multiple:false,
    closeOnSelect:true,
    onChange:function(){},
    optionFilter:(filterText,option)=>{
        return (option.label.toLowerCase().indexOf(filterText) > -1);
    }

}

export default Selected;