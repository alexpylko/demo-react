# The base payment gateway class
#
class PaymentGateway

  def initialize(amount:, currency:)
    @amount = amount
    @currency = currency
  end

  def pay(options = {}, &block)
    yield(options) if block_given?
  end

  protected

  attr_accessor :amount
  attr_accessor :currency

end