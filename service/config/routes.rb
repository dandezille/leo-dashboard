Rails.application.routes.draw do
  root 'pages#home'
  resources :activities, only: [:index]
end
