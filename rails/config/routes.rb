Rails.application.routes.draw do
  resources :activities, only: [:index]
  root 'pages#index'
end
