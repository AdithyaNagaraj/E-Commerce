import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { ReactComponent as Logo } from '../../assests/shopping-bag.svg';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_SbPtyRah5hoKm3dMUyE6Qham00dwjlRCXQ';

    const onToken = token => {
        console.log( token )
        alert( ' Payment is Successfull ' );
    }
    return (

        <StripeCheckout 
        label = 'Pay Now'
        name = 'Branded Clothing Store'
        billingAddress
        shippingAddress
        image = 'https://stripe.com/img/documentation/checkout/marketplace.png'
        //image = 'F:\Udemy Courses\React JS\Projects\branded-clothing\src\assests\Logo.jpg'
        //currency = 'INR'
        description = {`Your Total is ₹${price}` }
        amount = { priceForStripe }
        panelLabel = 'Pay Now'
        token = { onToken }
        stripeKey = { publishableKey }
        />
        //<Logo />
    );
};

export default StripeCheckoutButton;
