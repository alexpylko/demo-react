import React from "react";
import {Button, FormLayout, Stack, TextStyle, Thumbnail} from "@shopify/polaris";
import PropTypes from "prop-types";
import {
    CardCVCElement,
    CardExpiryElement,
    CardNumberElement,
    injectStripe
} from "react-stripe-elements";

// The Stripe form with the credit card elements
class CardForm extends React.Component {

    static contextTypes = {
        checkout: PropTypes.object
    };

    componentDidMount() {
        const {checkout} = this.context;
        checkout.onSubmit = this.onSubmit;
    }

    render() {
        return (
            <FormLayout>
                <Stack>
                    <Stack.Item fill>
                        <TextStyle variation="strong">
                            Credit Card
                        </TextStyle>
                    </Stack.Item>
                    <Stack.Item >
                        <Thumbnail size="small" source="/assets/card_visa.png" />
                    </Stack.Item>
                    <Stack.Item>
                        <Thumbnail size="small" source="/assets/card_mastercard.png" />
                    </Stack.Item>
                    <Stack.Item>
                        <Thumbnail size="small" source="/assets/card_amex.png" />
                    </Stack.Item>
                </Stack>
                <CardNumberElement className="card-form__input"/>
                <FormLayout.Group >
                    <div className="card-form__data">
                        <CardExpiryElement className="card-form__input"/>
                        <CardCVCElement className="card-form__input"/>
                    </div>
                </FormLayout.Group>
                <div className="card-form__btn"><Button primary submit>Complete Purchase</Button></div>
            </FormLayout>
        );
    }

    // Post the order request
    onSubmit = async (e) => {
        e.preventDefault();
        const {target} = e;
        const {checkout} = this.context;
        try {
            // Serialize all form elements into object
            const attributes = $(target).serializeObject();
            const stripe = await this.createSource(attributes);
            // const stripe = {source: "src_1FVj9hKMEauxsMPf3r1QHyzW", cc_exp_month: 12, cc_exp_year: 2024, cc_last4: "4242", cc_brand: "Visa"};

            // Make an order with Stripe provider as type
            checkout.makeOrder({
                type: "Stripe",
                data: {
                    attributes: {
                        ...attributes,
                        ...stripe
                    }
                }
            });
        }
        catch(e) {
            console.log("++++error", e);
        }
    };

    // Create the Stripe source
    // See more https://stripe.com/docs/sources/cards
    async createSource(attributes) {
        const { stripe } = this.props;
        const { email, first_name, last_name, address1, city, country, zip } = attributes;

        // Options for the source request
        const options = {
            type: "card",
            owner: {
                name: `${first_name} ${last_name}`,
                address: {
                    line1: address1,
                    city,
                    postal_code: zip,
                    country,
                },
                email
            }
        };

        try {
            // Make the source request
            const response = await stripe.createSource(options);
            console.log("Stripe: ", response);

            const {source: {
                id: source,
                last4: cc_last4,
                exp_month: cc_exp_month,
                exp_year: cc_exp_year,
                brand: cc_brand
            }} = response;

            return { source, cc_last4, cc_exp_month, cc_exp_year, cc_brand };
        }
        catch(e) {
            console.log("++++error", e);
        }
    }

}

export default injectStripe(CardForm);