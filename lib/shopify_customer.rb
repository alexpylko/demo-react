#
# The Facade pattern over Shopify::Customer API
#
class ShopifyCustomer

  def self.create_with(attributes)
    new(attributes)
  end

  def initialize(attributes = {})
    @attributes = attributes
  end

  # Find the existing or create a new Shopify customer by attributes
  #
  def find_or_create_by(attributes)
    find_by(attributes) || create(@attributes.merge(attributes))
  end

  # Find the existing Shopify customer by attributes
  #
  def find_by(attributes)
    ShopifyAPI::Customer.search(attributes).first
  end

  # Create a new Shopify customer
  #
  def create(attributes = {})
    ShopifyAPI::Customer.create(contact_attrs(attributes).merge(addresses: [ address_attrs(attributes) ]))
  end

  protected

  attr_accessor :attributes

  def address_attrs(attributes)
    attributes.slice(:first_name, :last_name, :address1, :city, :zip, :country)
  end

  def contact_attrs(attributes)
    attributes.slice(:first_name, :last_name, :email, :phone)
  end

end