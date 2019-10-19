import React from "react";
import { Layout, Page, Card, Form } from "@shopify/polaris";
import PropTypes from "prop-types";
import DefaultProvider, * as Providers from "../providers"
import AddressView from "./address_view";
import OrderList from "./order_list";

export default class CheckoutPage extends React.Component {

    static childContextTypes = {
        checkout: PropTypes.object
    };

    static defaultProps = {
        provider: "Stripe"
    };

    render() {
        const {products, provider, ...props} = this.props;
        const CardView = Providers[provider] || DefaultProvider;

        return (
            <Page title="Checkout">
                <Form onSubmit={e => this.onSubmit(e)}>
                    <Layout>
                        <Layout.Section>
                            <Card title="Shipping Details" sectioned>
                                <AddressView />
                            </Card>
                        </Layout.Section>
                        <Layout.Section secondary>
                            <Card title="Order Summary" sectioned>
                                <OrderList products={products} />
                            </Card>
                            <Card title="Payment Method" sectioned>
                                <CardView />
                            </Card>
                        </Layout.Section>
                    </Layout>
                </Form>
            </Page>
        );
    }

    getChildContext = () => {
        return {
            checkout: this
        };
    };

    // Callbacks

    onSubmit = (e) => {
        e.preventDefault();
    }

}