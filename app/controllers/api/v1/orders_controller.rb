require 'stripe'

class Api::V1::OrdersController < Api::ApplicationController
  include ShopifyApp::LoginProtection

  PERMITTED_ATTRIBUTES = %i(
    email address1 first_name last_name city zip source cc_exp_month cc_exp_year cc_last4 cc_brand
  )

  around_action :shopify_session

  def create
    products = ShopifyAPI::Product.find(:all, params: { limit: 5 })
    line_items = products.map do |product|
      variant = product.variants.first
      ShopifyAPI::LineItem.new(quantity: 1, variant_id: variant.id)
    end

    # Stripe.api_key = 'sk_test_XWRMJFSZ35KcXOUqbRtJ43fS00b42m027s'
    #
    # stripe_charge = Stripe::Charge.create({
    #   amount: 2000,
    #   currency: 'PLN',
    #   source: source
    # })
    #
    # Rails.logger.debug("+++++source #{stripe_charge}")
    #

    # Find the existing Shopify customer by email
    shopify_customer = ShopifyAPI::Customer.search(email: attributes[:email]).first
    if shopify_customer.nil?
      address_attrs = attributes.slice(:first_name, :last_name, :address1, :city, :zip, :country)
      contact_attrs = attributes.slice(:first_name, :last_name, :email)
      # Create a new Shopify customer
      ShopifyAPI::Customer.create(**contact_attrs, addresses: [ address_attrs ])
    end

    order = ShopifyAPI::Order.create(
        email: attributes[:email],
        fulfillment_status: "fulfilled",
        line_items: line_items
    )

    render json: {order_status_url: order.order_status_url}
  end

  protected

  def permitted_attributes
    PERMITTED_ATTRIBUTES
  end

  def data_type
    permitted_params[:data][:type]
  end

end