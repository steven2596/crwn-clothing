import React from 'react';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    //Stripe wants the Cent unit. Instead of 5 dollars, it wants 500 cents 
    const priceForStripe = price * 100;
    //copy publishablekey from stripe account
    const publishableKey = 'pk_test_51I4r2mIViaGjWlb2feiJiKE1AyueyW88gDojz4zYQxYEBsJAavONLHlbpjEFmEstwAaXjlRhNGmGfRycXXmTlbLE00KtbuHjHw';

    //This will make post request to /payment to our server
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        })
            .then(response => {
                alert('Payment Successful');
            })
            .catch(error => {
                console.log('Payment error: ', JSON.parse(error));
                alert('There was an issue with your payment. Please make sure you use the provided credit card');
            })
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;