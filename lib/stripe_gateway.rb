require "payment_gateway"
require "payment_factory"
require 'stripe'

# The Stripe payment gateway class
#
class StripeGateway < PaymentGateway
  STRIPE_IDENTIFIER = "stripe".freeze

  def self.identifier
    STRIPE_IDENTIFIER
  end

  def pay(attributes)
    stripe_customer = StripeCustomer.create_with(attributes)
                           .find_or_create_by(email: attributes[:email])

    Stripe::Charge.create(
      amount: amount * 100,
      currency: currency,
      source: attributes[:source],
      customer: stripe_customer.id
    )
    super
  end

end

PaymentFactory.instance << StripeGateway