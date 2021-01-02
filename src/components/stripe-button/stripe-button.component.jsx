import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    //Stripe wants the Cent unit. Instead of 5 dollars, it wants 500 cents 
    const priceForStripe = price * 100;
    //copy publishablekey from stripe account
    const publishableKey = 'pk_test_51I4r2mIViaGjWlb2feiJiKE1AyueyW88gDojz4zYQxYEBsJAavONLHlbpjEFmEstwAaXjlRhNGmGfRycXXmTlbLE00KtbuHjHw';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
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