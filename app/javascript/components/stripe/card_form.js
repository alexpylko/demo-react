import React from "react";
import {Button, FormLayout, Stack, TextStyle, Thumbnail} from "@shopify/polaris";
import PropTypes from "prop-types";
import {
    CardCVCElement,
    CardExpiryElement,
    CardNumberElement,
    injectStripe
} from "react-stripe-elements";

class CardForm extends React.Component {

    static contextTypes = {
        checkout: PropTypes.object
    };

    componentDidMount() {
        const {checkout} = this.context;
        // checkout.onSubmit = this.onSubmit;
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
                    <Stack.Item fill>
                        <Thumbnail size="small" source="/assets/card_visa.png" />
                    </Stack.Item>
                    <Stack.Item>
                        <Thumbnail size="small" source="/assets/card_mastercard.png" />
                    </Stack.Item>
                    <Stack.Item>
                        <Thumbnail size="small" source="/assets/card_amex.png" />
                    </Stack.Item>
                </Stack>
                <CardNumberElement />
                <FormLayout.Group>
                    <CardExpiryElement />
                    <CardCVCElement />
                </FormLayout.Group>
                <Button primary submit>Complete Purchase</Button>
            </FormLayout>
        );
    }

    onSubmit = e => {
        e.preventDefault();
        this.createSource();
    };

    async createSource() {
        const { stripe } = this.props;

        const options = {
            type: "card",
        };

        try {
            const response = await stripe.createSource(options);
            const {source: {
                id: source,
                last4: cc_last4,
                exp_month: cc_exp_month,
                exp_year: cc_exp_year,
                brand: cc_brand
            }} = response;
            console.log("++++response", response);
        }
        catch(e) {
            console.log("++++error", e);
        }
    }

}

export default injectStripe(CardForm);