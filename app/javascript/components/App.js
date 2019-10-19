import React from "react";
import {AppProvider} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import CheckoutPage from "./checkout/checkout_page";
import '@shopify/polaris/styles.css';

const App = props => (
    <AppProvider i18n={enTranslations}>
        <CheckoutPage {...props} />
    </AppProvider>
);

export default App;