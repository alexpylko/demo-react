class Api::ApplicationController < ActionController::API

  protected

  def permitted_params
    params.permit(:type, data: {attributes: permitted_attributes})
  end

  def permitted_attributes
    []
  end

  def attributes
    permitted_params[:data][:attributes]
  end

end
