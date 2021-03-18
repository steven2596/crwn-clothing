import React from 'react';

import { SpinnerOverlay, SpinnerContainer } from './with-spinner.style';

const WithSpinner = (WrappedComponent) => {
    const Spinner = ({ isLoading, ...otherProps }) => {
        return isLoading ?
            (
                <SpinnerOverlay>
                    <SpinnerContainer />
                </SpinnerOverlay>
            )
            :
            (
                <WrappedComponent {...otherProps} />
            )
        //It's important to put {...otherProps} inside <WrappedComponent/>
        //For Eg. CollectionPage component needs to use match.params so it needs otherProps

    };
    return Spinner;
};

export default WithSpinner;

//Purpose of WithSpinner HOC
//-It takes a component as a parameter
//1. If isLoading is TRUE, it will return spinner component which is loading screen
//2. If isLoading is FALSE, it will return the component which this HOC took as its parameter
