# README

The app consist of the front-end app which communicate with server side via API endpoint. 

### Used external tools/api ###

#### Front end ####
* Shopify Polaris https://polaris.shopify.com/
* Stripe.Js https://stripe.com/docs/stripe-js

#### Backend end ####
* Shopify API https://help.shopify.com/en/api/reference 
* Stripe API https://stripe.com/docs/api 

### Set up ###

* Clone repository
* Run `bundle install`
* Run `yarn install`
* Run `rake db:migrate`
* Rename .env_initial to .env and fulfill the environment variables there with your API credentials
* Run `rails s`

### Remarks ###

* Use Stripe cards for testing https://stripe.com/docs/testing 

### App Workflow ### 

#### Step 1 ####
Fill the form
![alt text](https://github.com/alexpylko/demo-react/blob/master/app/assets/images/screenshot-1.png?raw=true)

#### Step 2 ####
Complete purchase
![alt text](https://github.com/alexpylko/demo-react/blob/master/app/assets/images/screenshot-2.png?raw=true)

#### Step 3 ####
Order confirmation
![alt text](https://github.com/alexpylko/demo-react/blob/master/app/assets/images/screenshot-3.png?raw=true)

#### Step 4 ####
The new customer has been added in Stripe
![alt text](https://github.com/alexpylko/demo-react/blob/master/app/assets/images/screenshot-4.png?raw=true)

#### Step 5 ####
Payment confirmation in Stripe
![alt text](https://github.com/alexpylko/demo-react/blob/master/app/assets/images/screenshot-5.png?raw=true)

#### Step 6 ####
Order confirmation in Shopify
![alt text](https://github.com/alexpylko/demo-react/blob/master/app/assets/images/screenshot-6.png?raw=true)
