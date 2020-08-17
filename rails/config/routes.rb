Rails.application.routes.draw do
  resources :activities, only: [:index, :edit]
  root 'pages#index'
end
