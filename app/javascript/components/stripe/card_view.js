import React from "react";
import {Elements, StripeProvider} from "react-stripe-elements";
import CardForm from "./card_form";

const CardView = (props) => {
    return (
        <StripeProvider apiKey={STRIPE_API_KEY}>
            <Elements>
                <CardForm {...props} />
            </Elements>
        </StripeProvider>
    );
};

export default CardView;