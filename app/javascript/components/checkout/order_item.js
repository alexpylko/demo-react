import React from "react";
import {Avatar, Badge, ResourceItem, TextStyle} from "@shopify/polaris";
import {currencyFormatter} from "../utils/formatters";

const OrderItem = (item) => {
    const {id, title, image: {src}, variants: {[0]: {price}}} = item;

    return (
        <ResourceItem
            id={id}
            media={
                <Avatar customer size="medium" name={title} source={src} />
            }
            name={name}
        >
            <Badge>1</Badge>
            <h3>
                <TextStyle>{title}</TextStyle>
            </h3>
            <TextStyle variation="strong">
                {currencyFormatter(price)}
            </TextStyle>
        </ResourceItem>
    );
};

export default OrderItem;