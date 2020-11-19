import React, { Component } from 'react'
import EditableComponent from './EditableComponent'

export class EditableInput extends Component {


    render() {
        return(
            <EditableComponent 
                {...this.props}
                renderComponent={(value, onChange, onKeyDown) => 
                    <input
                        onKeyDown={onKeyDown}
                        value={value}
                        onChange={onChange}
                        className={`${this.props.className} editable-item`}
                    />
                }
            />
        )
    }
}

