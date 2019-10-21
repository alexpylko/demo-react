#
# The Facade pattern over Stripe::Customer API
#
class StripeCustomer

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
    Stripe::Customer.list(attributes).data.first
  end

  # Create a new Shopify customer
  #
  def create(attributes = {})
    Stripe::Customer.create(contact_attrs(attributes).merge(address: address_attrs(attributes)))
  end

  protected

  attr_accessor :attributes

  def address_attrs(attributes)
    attributes.slice(:city, :country).tap do |object|
      object[:postal_code] = attributes[:zip]
      object[:line1] = attributes[:address1]
    end.to_h
  end

  def contact_attrs(attributes)
    attributes.slice(:email, :phone, :source).tap do |object|
      object[:name] = "#{attributes[:first_name]} #{attributes[:last_name]}"
    end.to_h
  end

end