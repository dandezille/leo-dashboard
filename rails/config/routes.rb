Rails.application.routes.draw do
  resources :activities, only: [:index, :new, :create, :edit, :update, :destroy]
  root 'pages#index'
end
