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

    onSubmit = async (e) => {
        e.preventDefault();
        const {target} = e;
        const {checkout} = this.context;
        try {
            // const stripe = await this.createSource();
            const stripe = {id: "src_1FVaizKMEauxsMPf6CS5Ap1g", cc_exp_month: 12, cc_exp_year: 2024, cc_last4: "4242", cc_brand: "Visa"};
            const attributes = $(target).serializeObject();
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

    async createSource() {
        const { stripe } = this.props;

        const options = {
            type: "card",
        };

        try {
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