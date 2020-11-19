
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
                renderComponent={(value, onChange, onKeyDown) => 
                    <select
                        onKeyDown={onKeyDown}
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


