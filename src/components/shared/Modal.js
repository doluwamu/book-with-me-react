import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

// Modal for creating booking confirmation
const BwmModal = (
    {title = "Modal Window", 
    subtitle = "Confirm your data", 
    openBtn: OpenBtn,
    children, 
    onSubmit}) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
        { !OpenBtn &&
            <button
                className="btn btn-success" 
                onClick={() => setIsOpen(true)}>
                    Open
            </button>
        }
        { OpenBtn &&
            <div onClick={() => setIsOpen(true)}>
                {OpenBtn}
            </div>
        }
            <Modal 
                focusTrapped={false}
                open={isOpen} 
                onClose={() => setIsOpen(false)} 
                classNames={{ modal: 'bwm-modal' }}
            >
                <h4 className='modal-title title'>{title}</h4>
                <p className='modal-subtitle'>{subtitle}</p>
                <div className='modal-body'>
                    {children}
                </div>
                <div className='modal-footer'>
                    <button 
                        onClick={() => onSubmit(() => setIsOpen(false))}
                        type='button' 
                        className='btn btn-bwm-main'
                    >
                        Confirm
                    </button>
                    <button 
                    type='button' 
                    className='btn btn-alert' 
                    onClick={() => setIsOpen(false)}>Cancel</button>
                </div>
            </Modal>
        </>
    )
}

export default BwmModal
