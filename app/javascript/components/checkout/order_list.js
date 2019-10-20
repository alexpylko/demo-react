import React from "react";
import {FormLayout, ResourceList, Stack} from "@shopify/polaris";
import OrderItem from "./order_item";

export default class OrderList extends React.Component {

    render() {
        const {products} = this.props;
        return (
            <div>
                <ResourceList
                    items={products}
                    renderItem={OrderItem}
                />
                <Stack >
                    <Stack.Item fill>
                        <div className="card__total">Total</div>
                    </Stack.Item>
                    <Stack.Item fill>
                        <div className="card__amount">PLN 150</div>
                    </Stack.Item>
                </Stack>
            </div>
        );
    }

    getTotal

}