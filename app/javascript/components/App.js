import React from "react";
import {AppProvider} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import '@shopify/polaris/styles.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import { AppStore, AppPersistor } from "./core/store";
import CheckoutPage from "./checkout/checkout_page";

const App = props => (
    <Provider store={AppStore}>
        <AppProvider i18n={enTranslations}>
            <PersistGate persistor={AppPersistor}>
                <Router>
                    <Route render={() => <CheckoutPage {...props} />}/>
                </Router>
            </PersistGate>
        </AppProvider>
    </Provider>
);

export default App;