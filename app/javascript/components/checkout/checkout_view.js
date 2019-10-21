import React from "react";
import { Layout, Page, Card, Form, Spinner } from "@shopify/polaris";
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { order_status_url } = this.props;
        if(order_status_url && !prevProps.order_status_url) {
            window.location.href = order_status_url;
        }
    }

    render() {
        const {loading, products, provider: CardView, ...props} = this.props;

        return (
            <Page title="Checkout">
                {loading && <Spinner size="large" color="teal" />}
                <Form onSubmit={e => this.onSubmit(e)}>
                    <Layout>
                        <Layout.Section>
                            <Card title="Shipping Details" sectioned>
                                <AddressView {...props} />
                            </Card>
                        </Layout.Section>
                        <Layout.Section secondary>
                            <Card title="Order Summary" sectioned>
                                <OrderList products={products} />
                            </Card>
                            <Card title="Payment Method" sectioned>
                                <CardView {...props} />
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