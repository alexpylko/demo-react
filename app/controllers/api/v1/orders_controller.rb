# @restful_api 3.0
#
# Orders API
#
class Api::V1::OrdersController < Api::ApplicationController
  include ShopifyApp::LoginProtection

  PERMITTED_ATTRIBUTES = %i(
    email
    address1
    country
    first_name
    last_name
    phone
    city
    zip
    source
    cc_exp_month
    cc_exp_year
    cc_last4
    cc_brand
  )

  around_action :shopify_session

  #
  # @url /api/v1/orders
  # @action POST
  #
  # Create a new order
  #
  # @required [Hash] attributes   The order attributes
  #
  #
  # @example_request
  #   ```json
  #   curl -H "Authorization: Token token=\"xsRUispZFsEx6ECYYLee\""
  #     "https://localhost:3000/api/v1/orders" -d '{"type": "Stripe",  "data": {"attributes": {
  #       "first_name": "Alexey",
  #       "last_name": "Pylko",
  #       "email": "alex@example.com",
  #       "country": "PL",
  #       "city": "Zielona Gora",
  #       "zip": "65-102",
  #       "address": "Oliwowa 34B/34",
  #     } } }'
  #   ```
  #
  def create
    email = attributes[:email]

    # Create payment gateway
    PaymentFactory.create(gateway_identifier,
      amount: total_amount, currency: "PLN"
    ).pay(attributes)

    # Retrieve or create a Shopify customer
    shopify_customer = ShopifyCustomer.create_with(attributes)
                           .find_or_create_by(email: email)

    # Create an order
    order = ShopifyAPI::Order.create(
        email: email,
        line_items: order_line_items
    )

    render json: {order_status_url: order.order_status_url}
  end

  protected

  # The payment gateway identifier
  def gateway_identifier
    @gateway_identifier ||= permitted_params[:type].downcase
  end

  # Retrieve shopify products
  def shopify_products
    @shopify_products ||= ShopifyAPI::Product.find(:all, params: { limit: 5 })
  end

  # Get the total order amount
  def total_amount
    @total_amount ||= shopify_products.reduce(0) do |memo, product|
      memo + product.variants.first.price.to_i
    end
  end

  # Generate the fake order line_items
  def order_line_items
    shopify_products.map do |product|
      ShopifyAPI::LineItem.new(quantity: 1, variant_id: product.variants.first.id)
    end
  end

  def permitted_attributes
    PERMITTED_ATTRIBUTES
  end

end