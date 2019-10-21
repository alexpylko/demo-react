Rails.application.routes.draw do
  root :to => 'home#index'
  mount ShopifyApp::Engine, at: '/'

  namespace :api, :defaults => { format: "json" }, only: :create do
    api_version(:module => "v1",
                :header => {:name => "Accept",
                            :value => "application/vnd.rever.co; version=1"},
                :path => { :value => "v1" }) do

      post :orders, to: "orders#create"

    end
  end

end
