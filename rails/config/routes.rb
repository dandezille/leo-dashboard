Rails.application.routes.draw do
  resources :schedules, only: [:index, :new, :create, :edit, :destroy]
  resources :activities, except: [:show]
  get '/weather', to: 'weather#index'
  get '/weather/full', to: 'weather#full'
  root 'pages#index'
end
