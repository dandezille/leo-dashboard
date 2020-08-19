Rails.application.routes.draw do
  resources :activities, except: [:show]
  get '/weather', to: 'weather#index'
  root 'pages#index'
end
