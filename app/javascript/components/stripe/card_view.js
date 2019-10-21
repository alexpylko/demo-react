import React from "react";
import {Elements, StripeProvider} from "react-stripe-elements";
import CardForm from "./card_form";

// The Stripe view with the form enclosed by the Stripe provider
const CardView = (props) => {
    return (
        <StripeProvider apiKey={STRIPE_PUBLISHABLE_KEY}>
            <Elements>
                <CardForm {...props} />
            </Elements>
        </StripeProvider>
    );
};

export default CardView;