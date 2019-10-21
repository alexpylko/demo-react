import { connect } from "react-redux";
import CheckoutView from "./checkout_view";
import { makeOrder } from "../api/orders";
import DefaultProvider, * as Providers from "../providers"
import { DEFAULT_PROVIDER } from "../config";
import { API_ORDERS_URL } from "../api/routing";
import { withRouter } from "react-router-dom"

const makeMapStateToProps = (state, ownProps) => {
    const {provider = DEFAULT_PROVIDER} = ownProps;
    const {api: {loading = false, meta: {[API_ORDERS_URL]: response = {}} = {}}} = state;
    const {countries} = window.gon;

    return {
        ...response,
        provider: Providers[provider] || DefaultProvider,
        loading,
        countries
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeOrder: (params) => dispatch(makeOrder(params))
    };
};

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(CheckoutView));