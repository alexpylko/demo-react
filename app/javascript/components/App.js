import React from "react";
import {AppProvider} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import Checkout from "./checkout";
import '@shopify/polaris/styles.css';

const App = props => (
    <AppProvider i18n={enTranslations}>
        <Checkout {...props} />
    </AppProvider>
);

export default App;