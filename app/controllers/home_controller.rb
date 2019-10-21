# frozen_string_literal: true

class HomeController < AuthenticatedController

  def index
    @products = ShopifyAPI::Product.find(:all, params: { limit: 5 })
    @webhooks = ShopifyAPI::Webhook.find(:all)
    gon.countries = Country.all.map { |_| {label: _.name, value: _.alpha2} }
  end

end
