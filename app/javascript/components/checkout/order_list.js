import React from "react";
import {FormLayout, ResourceList, Stack} from "@shopify/polaris";
import OrderItem from "./order_item";
import {currencyFormatter} from "../utils/formatters";

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
                        <div className="card__amount">{this.getTotalAmountFormatted()}</div>
                    </Stack.Item>
                </Stack>
            </div>
        );
    }

    getTotalAmountFormatted() {
        return currencyFormatter(this.getTotalAmount());
    }

    getTotalAmount() {
        const {products} = this.props;
        return products.reduce((memo, {variants: {[0]: {price}}}) => {
            return memo + parseInt(price);
        }, 0);
    }

}