#
#  Payment factory as the register of the existing payments
#
# Example:
# Register a payment gateway
# PaymentFactory.instance << StripeGateway
# PaymentFactory.instance << CheckoutGateway
#
class PaymentFactory

  # Class methods

  def self.instance
    @@instance ||= new
  end

  def self.create(identifier, *attributes)
    instance.create(identifier, *attributes)
  end

  # Instance methods

  # Create a gateway instance by an identifier
  def create(identifier, *attributes)
    klass = items[identifier]
    klass.new(*attributes)
  end

  # Push a gateway class into the register
  def <<(klass)
    raise "Gateway identifier is not defined" unless klass.respond_to?(:identifier)
    @items[klass.identifier] = klass
  end

  # Retrieve a gateway class by identifier
  def [](identifier)
    items[identifier]
  end

  protected

  attr_accessor :items

  def initialize
    @items = {}
  end

end