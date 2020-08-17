Rails.application.routes.draw do
  resources :activities, only: [:index, :new, :create, :edit, :update]
  root 'pages#index'
end
