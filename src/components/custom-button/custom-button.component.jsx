import React from 'react';

import './custom-button.style.scss';

const CustomButton = ({ children, isGoogleSignIn, isInverted, ...otherProps }) => (

    <button className={`${isInverted ? 'invert' : ''} ${isGoogleSignIn ? 'google-button' : ''} custom-button`} {...otherProps}>
        {children}
    </button>

)

export default CustomButton;