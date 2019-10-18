import React from "react";
import { AppProvider, Page, Card, Button, Thumbnail } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

const App = props => (
    <AppProvider i18n={enTranslations}>
        <Page title="Products">
            {props.products.map((product, index) => (
                <Card key={index}
                      title={product.title}
                      primaryFooterAction={{
                          content: 'View',
                          url: 'https://${shop_session.url}/admin/products/${product.id}',
                      }}
                      sectioned
                >
                    <Thumbnail
                        source={product.images[0].src}
                        alt={product.title}
                        size="small"
                    />
                </Card>
            ))}
        </Page>
    </AppProvider>
);

export default App;