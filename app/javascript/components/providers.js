import CardView from "./stripe/card_view";

// Register payments providers here, for example as Paypal or Checkout

// Stripe payment provider
export const Stripe = CardView;

// make the Stripe payment provider as default
export default Stripe;
