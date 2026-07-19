import React from 'react'

const Button = ({ children, disabled, type, onClick, className }) => {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={className}
        >
            {children}
        </button>
    )
}

export default Button
