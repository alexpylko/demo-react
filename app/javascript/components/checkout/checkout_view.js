import React from "react";
import { Layout, Page, Card, Form } from "@shopify/polaris";
import PropTypes from "prop-types";
import AddressView from "./address_view";
import OrderList from "./order_list";
import { DEFAULT_PROVIDER } from "../config";

export default class CheckoutView extends React.Component {

    static childContextTypes = {
        checkout: PropTypes.object
    };

    static defaultProps = {
        provider: DEFAULT_PROVIDER
    };

    render() {
        const {products, provider: CardView, ...props} = this.props;

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
    };

    makeOrder = (params = {}) => {
        this.props.makeOrder(params);
    };

}