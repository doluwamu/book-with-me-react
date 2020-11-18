import React, { Component } from 'react'

export class EditableInput extends Component {

    constructor({ entity, field }) {
        super();

        this.state = {
            value: entity[field],
            originValue: entity[field],
            isActiveInput: false
        }
    }

    update = () => {
        const { value, originValue } = this.state
        const { onUpdate, field } = this.props

        if(value !== originValue) {
            onUpdate(
                {[field]: value}, 
                () => this.setState({isActiveInput: false, originValue: value}), 
                () => this.setState({isActiveInput: false, value: originValue}))
        }
    }

    activateInput = () => this.setState({isActiveInput: true})
    disableInput = () => 
        this.setState({isActiveInput: false, value: this.state.originValue})

    handleChange = event => {
        this.setState({value: event.target.value})
    }

    renderComponentView = () => {
        const { value, isActiveInput } = this.state
        const { className } = this.props
        if(isActiveInput){
            return(
                <>
                <input
                    className={`${className} editable-item`}
                    value={value}
                    onChange={this.handleChange}
                />
                <div className='button-container'>
                    <button className="btn btn-success btn-editable" onClick={this.update}>Save</button>
                    <button className="btn btn-danger btn-editable" onClick={this.disableInput}>Cancel</button>
                </div>
                </>
            )
        }

        return(
            <>
            <span 
                className={`${className} editable-item`}
            >
                {value}</span>
            <div className='button-container'>
                <button className="btn btn-warning btn-editable" onClick={this.activateInput}>Edit</button>
            </div>
            </>
        )
    }

    render() {
        
        return (
            <div className="editable-component">
                {this.renderComponentView()}
            </div>
        )
    }
}

export default EditableInput
