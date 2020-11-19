
import React, { Component } from 'react'
import EditableComponent from './EditableComponent'

export class EditableSelect extends Component {

    renderOptions = (options) => 
        options.map(option => 
            <option key={option} value={option}>{`${option}`}</option>
        )

    render() {
        const { className, options } = this.props
        return(
            <EditableComponent 
                {...this.props}
                renderComponent={(value, onChange) => 
                    <select
                        className={`${className} editable-item`}
                        value={value}
                        onChange={onChange}
                    >
                        {this.renderOptions(options)}
                    </select>
                }
            />
        )
    }
}

export default EditableSelect

