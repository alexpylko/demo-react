import React from "react";
import {FormLayout, TextField} from "@shopify/polaris";

export default class AddressView extends React.Component {

    render() {
        return (
            <FormLayout>
                <TextField
                    label="Email"
                    placeholder="example@email.com"
                    value="example@email.com"
                    name="email"
                />
                <FormLayout.Group>
                    <TextField
                        label="First name"
                        placeholder="Tom"
                        value="Tom"
                        name="first_name"
                    />
                    <TextField
                        label="Last name"
                        placeholder="Ford"
                        value="Ford"
                        name="last_name"
                    />
                </FormLayout.Group>
                <TextField
                    label="Address"
                    placeholder="Address"
                    name="address"
                />
                <FormLayout.Group>
                    <TextField
                        label="City"
                        placeholder="City"
                        name="city"
                    />
                    <TextField
                        label="Zip code"
                        placeholder="Zip code"
                        name="zip_code"
                    />
                </FormLayout.Group>
                <TextField
                    label="Country"
                    placeholder="Country"
                    error="Test error"
                />
            </FormLayout>
        );
    }

}
