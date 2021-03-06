
import React, { Component } from 'react'
import EditableComponent from './EditableComponent'

export class EditableTextarea extends Component {


    render() {
        const { className, cols, rows } = this.props
        return(
            <EditableComponent 
                {...this.props}
                renderComponent={(value, onChange, onKeyDown) => 
                    <textarea
                        onKeyDown={onKeyDown}
                        className={`${className} editable-item`}
                        value={value}
                        onChange={onChange}
                        rows={rows}
                        cols={cols}
                    />
                }
            />
        )
    }
}

