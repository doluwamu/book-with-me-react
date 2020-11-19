import React from 'react'
import EditableComponent from './EditableComponent'

export class EditableTextarea extends EditableComponent {


    renderComponentView = () => {
        const { value, isActiveInput } = this.state
        const { className, transformView, rows, cols } = this.props
        if(isActiveInput){
            return(
                <>
                <textarea
                    className={`${className} editable-item`}
                    value={value}
                    onChange={this.handleChange}
                    rows={rows}
                    cols={cols}
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
                {transformView ? transformView(value) : value}</span>
            <div className='button-container'>
                <button className="btn btn-warning btn-editable" onClick={this.activateInput}>Edit</button>
            </div>
            </>
        )
    }

    render() {
        const {inline} = this.props
        return (
            <div className={`editable-component ${inline ? 'editable-component-inline' : ''}`}>
                {this.renderComponentView()}
            </div>
        )
    }
}

export default EditableTextarea;
