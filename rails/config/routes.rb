Rails.application.routes.draw do
  resources :activities, except: [:show]
  root 'pages#index'
end
