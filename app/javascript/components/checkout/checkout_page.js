import { connect } from "react-redux";
import CheckoutView from "./checkout_view";
import { makeOrder } from "../api/orders";
import DefaultProvider, * as Providers from "../providers"
import { DEFAULT_PROVIDER } from "../config";

const makeMapStateToProps = (state, ownProps) => {
    const {provider = DEFAULT_PROVIDER} = ownProps;

    return {
        provider: Providers[provider] || DefaultProvider
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeOrder: (params) => dispatch(makeOrder(params))
    };
};


export default connect(makeMapStateToProps, mapDispatchToProps)(CheckoutView);