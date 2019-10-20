import React from "react";
import {FormLayout, TextField} from "@shopify/polaris";

export default class AddressView extends React.Component {

    render() {
        return (
            <FormLayout>
                <TextField
                    label="Email"
                    placeholder="example@email.com"
                    value="alexpylko@gmail.com"
                    name="email"
                />
                <FormLayout.Group>
                    <TextField
                        label="First name"
                        placeholder="Tom"
                        value="Alexey"
                        name="first_name"
                    />
                    <TextField
                        label="Last name"
                        placeholder="Ford"
                        value="Pylko"
                        name="last_name"
                    />
                </FormLayout.Group>
                <TextField
                    label="Address"
                    placeholder="Address"
                    name="address1"
                    value="Strumykowa"
                />
                <FormLayout.Group>
                    <TextField
                        label="City"
                        placeholder="City"
                        name="city"
                        value="Zielona Gora"
                    />
                    <TextField
                        label="Zip code"
                        placeholder="Zip code"
                        name="zip"
                        value="65-101"
                    />
                </FormLayout.Group>
                <TextField
                    name="country"
                    label="Country"
                    placeholder="Country"
                    placeholdervalue="PL"
                />
            </FormLayout>
        );
    }

}
