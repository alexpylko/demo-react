import React from "react";
import {FormLayout, TextField} from "@shopify/polaris";

export default class AddressView extends React.Component {

    static defaultProps = {
        email: "",
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        zip_code: "",
        country: ""
    };

    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
    }

    render() {
        const { email, first_name, last_name, address, city, zip_code, country } = this.state;
        return (
            <FormLayout>
                <TextField
                    label="Email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={e => this.onEmailChange(e)}
                    name="email"
                />
                <FormLayout.Group>
                    <TextField
                        label="First name"
                        placeholder="Tom"
                        value={first_name}
                        onChange={e => this.onFirstNameChange(e)}
                        name="first_name"
                    />
                    <TextField
                        label="Last name"
                        placeholder="Ford"
                        value={last_name}
                        onChange={e => this.onLastNameChange(e)}
                        name="last_name"
                    />
                </FormLayout.Group>
                <TextField
                    label="Address"
                    placeholder="Address"
                    name="address1"
                    value={address}
                    onChange={e => this.onAddressChange(e)}
                />
                <FormLayout.Group>
                    <TextField
                        label="City"
                        placeholder="City"
                        name="city"
                        value={city}
                        onChange={e => this.onCityChange(e)}
                    />
                    <TextField
                        label="Zip code"
                        placeholder="Zip code"
                        name="zip"
                        value={zip_code}
                        onChange={e => this.onZipCodeChange(e)}
                    />
                </FormLayout.Group>
                <TextField
                    name="country"
                    label="Country"
                    placeholder="Country"
                    value={country}
                    onChange={e => this.onCountryChange(e)}
                />
            </FormLayout>
        );
    }

    onEmailChange = (email) => {
        this.setState({email});
    };

    onFirstNameChange = (first_name) => {
        this.setState({first_name});
    };

    onLastNameChange = (last_name) => {
        this.setState({last_name});
    };

    onAddressChange = (address) => {
        this.setState({address});
    };

    onCityChange = (city) => {
        this.setState({city});
    };

    onZipCodeChange = (zip_code) => {
        this.setState({zip_code});
    };

    onCountryChange = (country) => {
        this.setState({country});
    };

}
